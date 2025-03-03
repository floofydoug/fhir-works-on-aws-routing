"use strict";
/*
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./offlineEnvVariables");
const aws_xray_sdk_1 = __importDefault(require("aws-xray-sdk"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const AWSWithXray = aws_xray_sdk_1.default.captureAWS(aws_sdk_1.default);
aws_sdk_1.default.config.update({
    customUserAgent: process.env.CUSTOM_USER_AGENT,
});
const { IS_OFFLINE } = process.env;
if (IS_OFFLINE === 'true') {
    aws_sdk_1.default.config.update({
        region: process.env.AWS_REGION || 'us-west-2',
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
    });
}
exports.default = AWSWithXray;
//# sourceMappingURL=AWS.js.map