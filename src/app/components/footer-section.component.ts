import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-section',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="shell footer-inner">
        <p>SIROE Next-Gen - Staffing IA - TaaS - ADN IA - AI Toolkit 2026</p>
        <div class="footer-links">
          <a href="#">Politica de privacidad</a>
          <a href="#">Terminos y condiciones</a>
          <a [href]="'mailto:' + contactEmail">{{ contactEmail }}</a>
        </div>
      </div>
    </footer>
  `,
})
export class FooterSectionComponent {
  readonly contactEmail = 'comercial@siroe.cl';
}
