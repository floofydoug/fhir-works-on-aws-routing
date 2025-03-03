"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 */
class OperationsGenerator {
    static generateOperationOutcomeIssue(severity, code, diagnosticMessage, divMessage = diagnosticMessage) {
        const result = {
            resourceType: 'OperationOutcome',
            text: {
                status: 'generated',
                div: `<div xmlns="http://www.w3.org/1999/xhtml"><h1>Operation Outcome</h1><table border="0"><tr><td style="font-weight: bold;">${severity}</td><td>[]</td><td><pre>${divMessage}</pre></td></tr></table></div>`,
            },
            issue: [
                {
                    severity,
                    code,
                    diagnostics: diagnosticMessage,
                },
            ],
        };
        return result;
    }
    static generateSuccessfulDeleteOperation(count = 1) {
        return {
            resourceType: 'OperationOutcome',
            text: {
                status: 'generated',
                div: `<div xmlns="http://www.w3.org/1999/xhtml"><h1>Operation Outcome</h1><table border="0"><tr><td style="font-weight: bold;">INFORMATION</td><td>[]</td><td><pre>Successfully deleted ${count} resource</pre></td></tr></table></div>`,
            },
            issue: [
                {
                    severity: 'information',
                    code: 'informational',
                    diagnostics: `Successfully deleted ${count} resource`,
                },
            ],
        };
    }
}
exports.default = OperationsGenerator;
//# sourceMappingURL=operationsGenerator.js.map