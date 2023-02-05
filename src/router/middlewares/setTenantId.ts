/*
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *
 */

import { FhirConfig } from 'fhir-works-on-aws-interface';
import express from 'express';
import { get, uniq } from 'lodash';
import RouteHelper from '../routes/routeHelper';

const getTenantIdFromAudString = (audClaim: string, baseUrl: string): string | undefined => {
    if (audClaim.startsWith(`${baseUrl}/tenant/`)) {
        return audClaim.substring(`${baseUrl}/tenant/`.length);
    }
    return undefined;
};

const getTenantIdFromAudClaim = (audClaim: any, baseUrl: string): string | undefined => {
    if (!audClaim) {
        return undefined;
    }
    let audClaimAsArray: string[] = [];

    if (typeof audClaim === 'string') {
        audClaimAsArray = [audClaim];
    }

    if (Array.isArray(audClaim)) {
        audClaimAsArray = audClaim;
    }

    const tenantIds = audClaimAsArray
        .map((aud: string) => getTenantIdFromAudString(aud, baseUrl))
        .filter((aud: any) => aud !== undefined);

    const uniqTenantIds = uniq(tenantIds);

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
export const setTenantIdMiddleware: (
    fhirConfig: FhirConfig,
) => (req: express.Request, res: express.Response, next: express.NextFunction) => void = (fhirConfig: FhirConfig) => {
    return RouteHelper.wrapAsync(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log('locals', JSON.stringify(res.locals));
        console.log('the path we check', fhirConfig.multiTenancyConfig?.tenantIdClaimPath!);
        console.log('the fhir config url', fhirConfig.server.url);
        // Find tenantId from custom claim and aud claim
        const tenantIdFromCustomClaim = get(res.locals.userIdentity, fhirConfig.multiTenancyConfig?.tenantIdClaimPath!);
        const tenantIdFromAudClaim = getTenantIdFromAudClaim(res.locals.userIdentity.aud, fhirConfig.server.url);
        console.log({ tenantIdFromAudClaim, tenantIdFromCustomClaim });
        const tenantId = tenantIdFromCustomClaim || tenantIdFromAudClaim;
        console.log('found dis tenant', tenantId);
        console.log('checking against', req.params.tenantIdFromPath);
        console.log('reqURL', req.url);
        console.log('req.host', req.hostname);
        // res.locals.tenantId = tenantId;
        res.locals.tenantId = res.locals.userIdentity.tenant;
        next();
    });
};
