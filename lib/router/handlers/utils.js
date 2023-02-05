"use strict";
/*
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateXHTMLResource = exports.hash = void 0;
const crypto_1 = require("crypto");
const sanitize_html_1 = __importStar(require("sanitize-html"));
const hash = (o) => (0, crypto_1.createHash)('sha256').update(JSON.stringify(o)).digest('hex');
exports.hash = hash;
const validateXHTMLResource = (resource) => {
    // we want to ignore the text field as it requires unencoded html as per the FHIR spec
    // https://www.hl7.org/fhir/datatypes-definitions.html#HumanName.text (for example)
    const originalResource = JSON.stringify({ ...resource, text: {} });
    const validatedResource = (0, sanitize_html_1.default)(originalResource, {
        allowedAttributes: {
            ...sanitize_html_1.defaults.allowedAttributes,
            div: ['xmlns'],
        },
    });
    return originalResource === validatedResource;
};
exports.validateXHTMLResource = validateXHTMLResource;
//# sourceMappingURL=utils.js.map