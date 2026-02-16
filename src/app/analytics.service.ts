import { Injectable } from '@angular/core';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly trackedEvents = new Set([
    'cta_staffing_click',
    'cta_adn_ia_click',
    'whatsapp_button_click',
    'form_submit_success',
    'form_submit_error',
  ]);

  trackEvent(eventName: string, eventParams: Record<string, unknown> = {}): void {
    if (!this.trackedEvents.has(eventName)) {
      return;
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams);
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...eventParams });
    }
  }
}
