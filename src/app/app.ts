import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DocumentAgreementComponent } from './document-agreement/document-agreement.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DocumentAgreementComponent],
  template: `
    <app-document-agreement />
    <router-outlet />
  `,
  styles: ''
})

export class App {
  protected readonly title = signal('document-agreement-component');
}
