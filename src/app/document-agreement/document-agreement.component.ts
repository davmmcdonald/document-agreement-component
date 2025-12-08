import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DocumentGroup, LegalDocument } from './document-agreement.interface';
import { DocumentAgreementService } from './document-agreement.service';

@Component({
  selector: 'app-document-agreement',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './document-agreement.component.html',
  styleUrl: './document-agreement.component.css',
})
export class DocumentAgreementComponent {
  loading: boolean = false;
  error: { message: string; visible: boolean; timeout: any; } = { message: '', visible: false, timeout: null }
  groupedDocuments: DocumentGroup[] = [];
  agreementForm: FormGroup;

  constructor(
    private documentService: DocumentAgreementService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.agreementForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.loading = true;

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
        active: defaultVersion,
        fullscreen: false
      });

      this.agreementForm.addControl(type, this.fb.control(false, Validators.requiredTrue));
    }

    this.loading = false;
  }

  submitForm(): void {
    if (this.agreementForm.valid) {

    } else {
      this.toggleError('You must agree to all documents before continuing!');
    }
  }

  toggleError(message: string): void {
    if (this.error.timeout) {
      clearTimeout(this.error.timeout);
    }

    this.error.message = message;
    this.error.visible = true;

    this.error.timeout = setTimeout(() => {
      this.error.visible = false;
      this.cdr.detectChanges();
    }, 3000);
  }

  toggleFullscreen(group: DocumentGroup): void {
    group.fullscreen = !group.fullscreen;
  }

  replaceUnderscores(string: string): string {
    return string.split('_').join(' ');
  }
}
