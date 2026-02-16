import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AnalyticsService } from '../analytics.service';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RevealDirective],
  template: `
    <section class="section shell" id="contacto">
      <div class="contact-shell" appReveal style="--d: 0.08s">
        <div class="contact-copy">
          <p class="kicker">Contacto Comercial</p>
          <h2>Hablemos de tu plan de Staffing IA.</h2>
          <p>Completa el formulario y te contactamos para definir modelo, perfiles y tiempos de activacion.</p>
          <p class="contact-mail">{{ contactEmail }}</p>
        </div>

        <form class="contact-form" [formGroup]="leadForm" (ngSubmit)="onSubmit()" novalidate>
          <div class="field-row">
            <label for="nombre">Nombre</label>
            <input id="nombre" type="text" formControlName="nombre" autocomplete="name" />
          </div>
          <div class="field-row">
            <label for="email">Email</label>
            <input id="email" type="email" formControlName="email" autocomplete="email" />
          </div>
          <div class="field-row">
            <label for="empresa">Empresa</label>
            <input id="empresa" type="text" formControlName="empresa" autocomplete="organization" />
          </div>
          <div class="field-row">
            <label for="interes">Interes</label>
            <select id="interes" formControlName="interes">
              <option value="">Selecciona una opcion</option>
              <option value="staffing_ia">Staffing IA</option>
              <option value="taas_squads">TaaS para squads</option>
              <option value="adn_ia">ADN IA</option>
              <option value="ai_toolkit_2026">AI Toolkit 2026</option>
              <option value="otros">Otros</option>
            </select>
          </div>
          <div class="field-row field-row-full">
            <label for="mensaje">Mensaje</label>
            <textarea id="mensaje" rows="4" formControlName="mensaje"></textarea>
          </div>

          <input type="text" formControlName="website" class="hidden-honeypot" tabindex="-1" autocomplete="off" />

          <div class="captcha-note" role="note">
            Anti-spam activo: validacion de formulario + honeypot + ventana minima de envio.
          </div>

          <button type="submit" class="btn btn-primary" [disabled]="submitting">
            {{ submitting ? 'Enviando...' : 'Enviar solicitud' }}
          </button>

          <p class="form-feedback" [class.success]="feedbackType === 'success'" [class.error]="feedbackType === 'error'" role="status" aria-live="polite">
            {{ feedbackMessage }}
          </p>
        </form>
      </div>
    </section>
  `,
})
export class ContactSectionComponent {
  readonly contactEmail = 'comercial@siroe.cl';
  readonly leadForm;

  feedbackMessage = '';
  feedbackType: 'success' | 'error' | '' = '';
  submitting = false;
  private readonly formRenderedAt = Date.now();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly analytics: AnalyticsService
  ) {
    this.leadForm = this.formBuilder.nonNullable.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      empresa: ['', Validators.required],
      interes: ['', Validators.required],
      mensaje: ['', Validators.required],
      website: [''],
    });
  }

  async onSubmit(): Promise<void> {
    this.feedbackMessage = '';
    this.feedbackType = '';

    if (this.leadForm.invalid) {
      this.setError('Completa todos los campos obligatorios.', 'missing_fields');
      return;
    }

    const { email, website, interes } = this.leadForm.getRawValue();
    const elapsedSeconds = Math.floor((Date.now() - this.formRenderedAt) / 1000);

    if (!email || !this.isValidEmail(email)) {
      this.setError('Ingresa un email valido.', 'invalid_email');
      return;
    }

    if (website) {
      this.setError('No se pudo validar el envio.', 'honeypot_triggered');
      return;
    }

    if (elapsedSeconds < 4) {
      this.setError('Espera unos segundos y vuelve a intentar.', 'too_fast');
      return;
    }

    this.submitting = true;

    try {
      const payload = {
        ...this.leadForm.getRawValue(),
        _subject: 'Nuevo lead SIROE Next-Gen',
        _template: 'table',
      };

      const response = await fetch('https://formsubmit.co/ajax/comercial@siroe.cl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('request_failed');
      }

      this.feedbackMessage = 'Gracias, recibimos tu solicitud. Te contactaremos pronto.';
      this.feedbackType = 'success';
      this.leadForm.reset({ nombre: '', email: '', empresa: '', interes: '', mensaje: '', website: '' });
      this.analytics.trackEvent('form_submit_success', { interest: interes || 'none' });
    } catch {
      this.setError(`Hubo un problema al enviar. Escribenos a ${this.contactEmail}.`, 'network_or_endpoint');
    } finally {
      this.submitting = false;
    }
  }

  private setError(message: string, reason: string): void {
    this.feedbackMessage = message;
    this.feedbackType = 'error';
    this.analytics.trackEvent('form_submit_error', { reason });
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
