"use strict";
/*
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTenantIdMiddleware = void 0;
const fhir_works_on_aws_interface_1 = require("fhir-works-on-aws-interface");
const lodash_1 = require("lodash");
const routeHelper_1 = __importDefault(require("../routes/routeHelper"));
const tenantIdRegex = /^[a-zA-Z0-9\-_]{1,64}$/;
const getTenantIdFromAudString = (audClaim, baseUrl) => {
    if (audClaim.startsWith(`${baseUrl}/tenant/`)) {
        return audClaim.substring(`${baseUrl}/tenant/`.length);
    }
    return undefined;
};
const getTenantIdFromAudClaim = (audClaim, baseUrl) => {
    if (!audClaim) {
        return undefined;
    }
    let audClaimAsArray = [];
    if (typeof audClaim === 'string') {
        audClaimAsArray = [audClaim];
    }
    if (Array.isArray(audClaim)) {
        audClaimAsArray = audClaim;
    }
    const tenantIds = audClaimAsArray
        .map((aud) => getTenantIdFromAudString(aud, baseUrl))
        .filter((aud) => aud !== undefined);
    const uniqTenantIds = (0, lodash_1.uniq)(tenantIds);
    if (uniqTenantIds.length > 1) {
        // tokens with multiple aud URLs with different tenantIds are not supported
        return undefined;
    }
    if (uniqTenantIds.length === 0) {
        return undefined;
    }
    return uniqTenantIds[0];
};
/**
 * Sets the value of `res.locals.tenantId`
 * tenantId is used to identify tenants in a multi-tenant setup
 */
const setTenantIdMiddleware = (fhirConfig) => {
    return routeHelper_1.default.wrapAsync(async (req, res, next) => {
        var _a, _b;
        console.log('locals', JSON.stringify(res.locals));
        console.log('the path we check', (_a = fhirConfig.multiTenancyConfig) === null || _a === void 0 ? void 0 : _a.tenantIdClaimPath);
        console.log('the fhir config url', fhirConfig.server.url);
        // Find tenantId from custom claim and aud claim
        const tenantIdFromCustomClaim = (0, lodash_1.get)(res.locals.userIdentity, (_b = fhirConfig.multiTenancyConfig) === null || _b === void 0 ? void 0 : _b.tenantIdClaimPath);
        const tenantIdFromAudClaim = getTenantIdFromAudClaim(res.locals.userIdentity.aud, fhirConfig.server.url);
        console.log({ tenantIdFromAudClaim, tenantIdFromCustomClaim });
        // TenantId should exist in at least one claim, if exist in both claims, they should be equal
        if ((tenantIdFromCustomClaim === undefined && tenantIdFromAudClaim === undefined) ||
            (tenantIdFromCustomClaim && tenantIdFromAudClaim && tenantIdFromCustomClaim !== tenantIdFromAudClaim)) {
            throw new fhir_works_on_aws_interface_1.UnauthorizedError('Unauthorized');
        }
        const tenantId = tenantIdFromCustomClaim || tenantIdFromAudClaim;
        console.log('found dis tenant', tenantId);
        console.log('checking against', req.params.tenantIdFromPath);
        console.log('reqURL', req.url);
        console.log('req.host', req.hostname);
        console.log('da regex', tenantIdRegex);
        if (!tenantIdRegex.test(tenantId) ||
            (req.params.tenantIdFromPath !== undefined && req.params.tenantIdFromPath !== tenantId)) {
            console.log('eureka');
            throw new fhir_works_on_aws_interface_1.UnauthorizedError('Unauthorized');
        }
        // res.locals.tenantId = tenantId;
        res.locals.tenantId = req.params.tenantIdFromPath;
        next();
    });
};
exports.setTenantIdMiddleware = setTenantIdMiddleware;
//# sourceMappingURL=setTenantId.js.map