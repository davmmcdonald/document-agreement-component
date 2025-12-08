import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AgreementSubmission, Alert, DocumentGroup, LegalDocument } from './document-agreement.interface';
import { DocumentAgreementService } from './document-agreement.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-document-agreement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './document-agreement.component.html',
  styleUrl: './document-agreement.component.css',
})

export class DocumentAgreementComponent implements OnInit {
  loading = signal(false);
  alert = signal<Alert>({
    message: '',
    isError: false,
    visible: false,
    timeout: null
  });
  groupedDocuments = signal<DocumentGroup[]>([]);
  agreementForm: FormGroup;

  constructor(
    private documentService: DocumentAgreementService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.agreementForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.loading.set(true);

    this.documentService.retrieveDocuments().subscribe({
      next: (documents: LegalDocument[]) => {
        this.sortDocuments(documents);
      },
      error: (error) => {
        this.toggleAlert('Failed to retrieve legal documents. Please try again.', true);
        this.loading.set(false);
      }
    });
  }

  private sortDocuments(documents: LegalDocument[]): void {
    const groups: { [key: string]: LegalDocument[] } = {};
    const tempGroupedDocuments: DocumentGroup[] = [];

    documents.forEach(document => {
      if (!groups[document.type]) {
        groups[document.type] = [];
      }

      document.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`/assets/${document.fileName}`);

      groups[document.type].push(document);
    });

    for (const type in groups) {
      const variations = groups[type];
      const changesVersion = variations.find(d => d.changesOnly);
      const fullVersion = variations.find(d => !d.changesOnly);
      const defaultVersion = (changesVersion || fullVersion)!;

      tempGroupedDocuments.push({
        type: type,
        variations: variations,
        default: defaultVersion,
        fullscreen: false
      });

      this.agreementForm.addControl(type, this.fb.control(false, Validators.requiredTrue));
    }

    this.groupedDocuments.set(tempGroupedDocuments);
    this.loading.set(false);
  }

  submitForm(event: Event): AgreementSubmission[] | void {
    event.preventDefault();
    this.agreementForm.markAllAsTouched();

    if (this.agreementForm.valid) {
      const payload: AgreementSubmission[] = this.groupedDocuments()
        .map(group => {
          const fullVersion = group.variations.find(d => !d.changesOnly);

          return {
            legalFileRecordId: fullVersion!.legalFileRecordId
          } as AgreementSubmission;
        });
        console.log('Payload:', payload);

        this.agreementForm.reset();
        this.toggleAlert('Response submitted successfully!', false);

        return payload;
    } else {
      this.toggleAlert('You must agree to all documents before continuing!', true);
    }
  }

  toggleAlert(message: string, isError: boolean): void {
    if (this.alert().timeout) {
      clearTimeout(this.alert().timeout);
    }

    this.alert.set({
      message: message,
      isError: isError,
      visible: true,
      timeout: setTimeout(() => {
        this.alert.update(a => ({ ...a, visible: false }));
      }, 3000)
    });
  }

  toggleFullscreen(group: DocumentGroup): void {
    group.fullscreen = !group.fullscreen;
  }

  replaceUnderscores(string: string): string {
    return string.split('_').join(' ');
  }

  getFullDocument(group: DocumentGroup): SafeResourceUrl | undefined {
    return group.variations.find(d => !d.changesOnly)?.safeUrl;
  }
}