import { Auth } from 'fhir-works-on-aws-interface';
export default function makeSecurity(authConfig: Auth, hasCORSEnabled?: boolean): {
    cors: boolean;
    service: {
        coding: {
            system: string;
            code: "Basic" | "NTLM" | "OAuth" | "SMART-on-FHIR" | "Kerberos" | "Certificates";
        }[];
    }[];
} | {
    cors: boolean;
    description: string;
};
