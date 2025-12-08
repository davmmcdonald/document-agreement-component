import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentGroup, LegalDocument } from './document-agreement.interface';
import { DocumentAgreementService } from './document-agreement.service';

@Component({
  selector: 'app-document-agreement',
  imports: [CommonModule],
  templateUrl: './document-agreement.component.html',
  styleUrl: './document-agreement.component.css',
})
export class DocumentAgreementComponent {
  groupedDocuments: DocumentGroup[] = [];
  agreementForm: FormGroup;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private documentService: DocumentAgreementService,
    private fb: FormBuilder
  ) {
    this.agreementForm = this.fb.group({});
  }

  ngOnInit() {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.loading = true;
    this.error = null;

    this.documentService.retrieveDocuments().subscribe({
      next: (documents: LegalDocument[]) => {
        this.sortDocuments(documents);
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading = false;
      }
    });
  }

  private sortDocuments(documents: LegalDocument[]): void {
    const groups: { [key: string]: LegalDocument[] } = {};

    documents.forEach(document => {
      if (!groups[document.type]) {
        groups[document.type] = [];
      }

      groups[document.type].push(document);
    });

    for (const type in groups) {
      const variations = groups[type];
      const changesVersion = variations.find(d => d.changesOnly);
      const fullVersion = variations.find(d => !d.changesOnly);
      const defaultVersion = (changesVersion || fullVersion)!;

      this.groupedDocuments.push({
        type: type,
        variations: variations,
        active: defaultVersion
      });

      this.agreementForm.addControl(type, this.fb.control(false, Validators.requiredTrue));
    }

    this.loading = false;
  }
}
