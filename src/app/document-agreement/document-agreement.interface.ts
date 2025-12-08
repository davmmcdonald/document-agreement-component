export interface LegalDocument {
    legalFileRecordId: string;
    type: string;
    fileName: string;
    version: number;
    changesOnly: boolean;
}

export interface DocumentGroup {
    type: string;
    variations: LegalDocument[];
    active: LegalDocument;
}