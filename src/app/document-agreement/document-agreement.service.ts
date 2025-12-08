import { Injectable } from '@angular/core';
import { LegalDocument } from './document-agreement.interface';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentAgreementService {
  private sampleData: LegalDocument[] = [
    {
      legalFileRecordId: "3cc85ca4-c9ce-4923-b1da-5fed8ffe9898",
      type: "VENDOR_AGREEMENT",
      fileName: "agreement1.pdf",
      version: 2,
      changesOnly: false
    },
    {
      legalFileRecordId: "bcac09a7-1f14-4a96-ba8b-f64d25ecfb6c",
      type: "VENDOR_AGREEMENT",
      fileName: "agreement1-changes.pdf",
      version: 2,
      changesOnly: true
    },
    {
      legalFileRecordId: "4dea1234-5678-4a96-ba8b-f64d25abcdef",
      type: "TERMS_OF_SERVICE",
      fileName: "terms-of-service.pdf",
      version: 1,
      changesOnly: false
    }
  ];
  
  retrieveDocuments(): Observable<LegalDocument[]> {
    return of(this.sampleData).pipe(delay(1000));
  }
}
