"use strict";
/*
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureIdFromUrn = exports.captureFullUrlParts = exports.captureVersionIdRegExp = exports.captureResourceTypeRegExp = exports.captureResourceIdRegExp = exports.timeFromEpochInMsRegExp = exports.dateTimeWithTimeZoneRegExp = exports.utcTimeRegExp = exports.resourceTypeWithUuidRegExp = exports.uuidRegExp = void 0;
exports.uuidRegExp = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/;
exports.resourceTypeWithUuidRegExp = /\w+\/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/;
exports.utcTimeRegExp = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d+)?Z/;
exports.dateTimeWithTimeZoneRegExp = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d+)?(?:Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])/;
exports.timeFromEpochInMsRegExp = /\d{13}/;
// Exp. Patient/de5b1d47-2780-4508-9273-4e0ec133ee3a
exports.captureResourceIdRegExp = /^(\w{1,30})\/[-\w+]{1,100}$/;
// Exp. Patient/de5b1d47-2780-4508-9273-4e0ec133ee3a
exports.captureResourceTypeRegExp = /^(\w{1,30})\/[-\w+]{1,100}$/;
// Exp. Patient/de5b1d47-2780-4508-9273-4e0ec133ee3a/_history/1
exports.captureVersionIdRegExp = /\w+\/[-\w+]+\/_history\/(\w+)/;
// http://hl7.org/fhir/references.html#regex
// Exp. https://API_URL.com/fhir/Patient/14/_history/1
// match groups = [https://API_URL.com/fhir/Patient/14, https://API_URL.com/fhir/, Patient, 14, 1]
exports.captureFullUrlParts = /((?:http|https):\/\/[(A-Za-z0-9_\-\\.:%$)*/]+)?(Account|ActivityDefinition|AdverseEvent|AllergyIntolerance|Appointment|AppointmentResponse|AuditEvent|Basic|Binary|BiologicallyDerivedProduct|BodyStructure|Bundle|CapabilityStatement|CarePlan|CareTeam|CatalogEntry|ChargeItem|ChargeItemDefinition|Claim|ClaimResponse|ClinicalImpression|CodeSystem|Communication|CommunicationRequest|CompartmentDefinition|Composition|ConceptMap|Condition|Consent|Contract|Coverage|CoverageEligibilityRequest|CoverageEligibilityResponse|DetectedIssue|Device|DeviceDefinition|DeviceMetric|DeviceRequest|DeviceUseStatement|DiagnosticReport|DocumentManifest|DocumentReference|EffectEvidenceSynthesis|Encounter|Endpoint|EnrollmentRequest|EnrollmentResponse|EpisodeOfCare|EventDefinition|Evidence|EvidenceVariable|ExampleScenario|ExplanationOfBenefit|FamilyMemberHistory|Flag|Goal|GraphDefinition|Group|GuidanceResponse|HealthcareService|ImagingStudy|Immunization|ImmunizationEvaluation|ImmunizationRecommendation|ImplementationGuide|InsurancePlan|Invoice|Library|Linkage|List|Location|Measure|MeasureReport|Media|Medication|MedicationAdministration|MedicationDispense|MedicationKnowledge|MedicationRequest|MedicationStatement|MedicinalProduct|MedicinalProductAuthorization|MedicinalProductContraindication|MedicinalProductIndication|MedicinalProductIngredient|MedicinalProductInteraction|MedicinalProductManufactured|MedicinalProductPackaged|MedicinalProductPharmaceutical|MedicinalProductUndesirableEffect|MessageDefinition|MessageHeader|MolecularSequence|NamingSystem|NutritionOrder|Observation|ObservationDefinition|OperationDefinition|OperationOutcome|Organization|OrganizationAffiliation|Patient|PaymentNotice|PaymentReconciliation|Person|PlanDefinition|Practitioner|PractitionerRole|Procedure|Provenance|Questionnaire|QuestionnaireResponse|RelatedPerson|RequestGroup|ResearchDefinition|ResearchElementDefinition|ResearchStudy|ResearchSubject|RiskAssessment|RiskEvidenceSynthesis|Schedule|SearchParameter|ServiceRequest|Slot|Specimen|SpecimenDefinition|StructureDefinition|StructureMap|Subscription|Substance|SubstanceNucleicAcid|SubstancePolymer|SubstanceProtein|SubstanceReferenceInformation|SubstanceSourceMaterial|SubstanceSpecification|SupplyDelivery|SupplyRequest|Task|TerminologyCapabilities|TestReport|TestScript|ValueSet|VerificationResult|VisionPrescription)\/([A-Za-z0-9\-.]{1,64})(\/_history\/[A-Za-z0-9\-.]{1,64})?/;
exports.captureIdFromUrn = /(urn:uuid:|urn:oid:)([\w-]+)+/;
//# sourceMappingURL=regExpressions.js.map