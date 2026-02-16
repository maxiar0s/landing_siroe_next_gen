import { Component } from '@angular/core';
import { AnalyticsService } from './analytics.service';
import { AdnIaSectionComponent } from './components/adn-ia-section.component';
import { ContactSectionComponent } from './components/contact-section.component';
import { FooterSectionComponent } from './components/footer-section.component';
import { HeroSectionComponent } from './components/hero-section.component';
import { ProfilesSectionComponent } from './components/profiles-section.component';
import { StaffingSectionComponent } from './components/staffing-section.component';
import { ToolkitSectionComponent } from './components/toolkit-section.component';
import { WhatsappFloatComponent } from './components/whatsapp-float.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeroSectionComponent,
    AdnIaSectionComponent,
    StaffingSectionComponent,
    ProfilesSectionComponent,
    ToolkitSectionComponent,
    ContactSectionComponent,
    FooterSectionComponent,
    WhatsappFloatComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private readonly analytics: AnalyticsService) {}

  onStaffingCta(): void {
    this.analytics.trackEvent('cta_staffing_click', { location: 'landing' });
  }

  onAdnCta(): void {
    this.analytics.trackEvent('cta_adn_ia_click', { location: 'landing' });
  }

  onWhatsappCta(): void {
    this.analytics.trackEvent('whatsapp_button_click', { location: 'landing' });
  }
}
