import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'app-profiles-section',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section class="section shell" id="perfiles">
      <div class="section-head" appReveal style="--d: 0.08s">
        <p class="kicker">Perfiles AI-Powered</p>
        <h2>Catalogo para TI, Data, Innovacion y Product Delivery.</h2>
      </div>
      <div class="catalog">
        <article class="catalog-item" appReveal *ngFor="let item of categories; let i = index" [style.--d]="delays[i]">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </article>
      </div>
    </section>
  `,
})
export class ProfilesSectionComponent {
  readonly delays = ['0.1s', '0.18s', '0.26s', '0.34s'];

  readonly categories = [
    {
      title: 'Engineering',
      description: 'AI Software Engineer, Fullstack AI, Platform Engineer, QA Automation AI.',
    },
    {
      title: 'Data + ML',
      description: 'Data Engineer, ML Engineer, MLOps Engineer, AI Analyst, Prompt Engineer.',
    },
    {
      title: 'Product + Delivery',
      description: 'AI Product Manager, Agile Coach, Technical Project Lead, Innovation PM.',
    },
    {
      title: 'Architecture + Governance',
      description: 'AI Architect, Data Architect, Security Specialist, Responsible AI Advisor.',
    },
  ];
}
