"use strict";
/*
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const cap_rest_resource_template_1 = require("./cap.rest.resource.template");
function makeRest(resource, security, globalOperations, bulkDataAccessEnabled) {
    var _a;
    const rest = {
        mode: 'server',
        documentation: 'Main FHIR endpoint',
        security,
        resource,
        interaction: (0, cap_rest_resource_template_1.makeOperation)(globalOperations),
    };
    if (globalOperations.includes('search-system')) {
        rest.searchParam = [
            {
                name: 'ALL',
                type: 'composite',
                documentation: 'Support all fields.',
            },
        ];
    }
    if (bulkDataAccessEnabled) {
        rest.operation = [
            {
                name: 'export',
                definition: 'http://hl7.org/fhir/uv/bulkdata/OperationDefinition/export',
                documentation: 'This FHIR Operation initiates the asynchronous generation of data to which the client is authorized. For more information please refer here: http://hl7.org/fhir/uv/bulkdata/export/index.html#bulk-data-kick-off-request. After a bulk data request has been started, the client MAY poll the status URL provided in the Content-Location header. For more details please refer here: http://hl7.org/fhir/uv/bulkdata/export/index.html#bulk-data-status-request',
            },
        ];
        const groupResource = rest.resource.find((r) => r.type === 'Group');
        if (groupResource !== undefined) {
            groupResource.operation = (_a = groupResource.operation) !== null && _a !== void 0 ? _a : [];
            groupResource.operation.push({
                name: 'group-export',
                definition: 'http://hl7.org/fhir/uv/bulkdata/OperationDefinition/group-export',
                documentation: 'This FHIR Operation initiates the asynchronous generation of data for a given Group. For more information please refer here: http://hl7.org/fhir/uv/bulkdata/export/index.html#endpoint---group-of-patients. After a bulk data request has been started, the client MAY poll the status URL provided in the Content-Location header. For more details please refer here: http://hl7.org/fhir/uv/bulkdata/export/index.html#bulk-data-status-request',
            });
        }
    }
    return rest;
}
exports.default = makeRest;
//# sourceMappingURL=cap.rest.template.js.map