"use strict";
/*
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResource = void 0;
const fhir_works_on_aws_interface_1 = require("fhir-works-on-aws-interface");
const utils_1 = require("../handlers/utils");
async function validateResource(validators, resourceType, resource, params = {}) {
    if (resourceType !== resource.resourceType) {
        throw new fhir_works_on_aws_interface_1.InvalidResourceError(`not a valid '${resourceType}'`);
    }
    if (process.env.VALIDATE_XHTML === 'true' && !(0, utils_1.validateXHTMLResource)(resource)) {
        throw new fhir_works_on_aws_interface_1.InvalidResourceError(`invalid resource html present in ${resourceType}`);
    }
    for (let i = 0; i < validators.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await validators[i].validate(resource, params);
    }
}
exports.validateResource = validateResource;
//# sourceMappingURL=validationUtilities.js.map