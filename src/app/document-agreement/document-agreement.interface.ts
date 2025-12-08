import { SafeResourceUrl } from "@angular/platform-browser";

export interface LegalDocument {
    legalFileRecordId: string;
    type: string;
    fileName: string;
    version: number;
    changesOnly: boolean;
    safeUrl?: SafeResourceUrl;
}

export interface DocumentGroup {
    type: string;
    variations: LegalDocument[];
    default: LegalDocument;
    fullscreen: boolean;
}

export interface AgreementSubmission {
    legalFileRecordId: string; 
}

export interface Alert {
    message: string;
    isError: boolean;
    visible: boolean;
    timeout: any;
}