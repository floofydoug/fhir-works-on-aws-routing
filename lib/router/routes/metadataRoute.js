"use strict";
/*
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const metadataHandler_1 = __importDefault(require("../metadata/metadataHandler"));
class MetadataRoute {
    constructor(fhirVersion, fhirConfigHandler, registry, operationRegistry, hasCORSEnabled) {
        this.fhirVersion = fhirVersion;
        this.metadataHandler = new metadataHandler_1.default(fhirConfigHandler, registry, operationRegistry, hasCORSEnabled);
        this.router = express_1.default.Router();
        this.init();
    }
    init() {
        // READ
        this.router.get('/', async (req, res) => {
            const mode = req.query.mode || 'full';
            const response = await this.metadataHandler.capabilities({
                fhirVersion: this.fhirVersion,
                mode,
            });
            res.send(response.resource);
        });
    }
}
exports.default = MetadataRoute;
//# sourceMappingURL=metadataRoute.js.map