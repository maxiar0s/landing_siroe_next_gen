import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'app-staffing-section',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section class="section split" id="staffing">
      <div class="shell split-layout">
        <div class="split-copy" appReveal style="--d: 0.08s">
          <p class="kicker">Staffing IA - TaaS (Talent as a Service)</p>
          <h2>Un perfil puntual o un squad completo: mismo estandar Next-Gen.</h2>
          <p>
            Disenamos equipos segun tus cuellos de botella: desde reforzar una celula existente hasta lanzar
            una iniciativa IA end-to-end.
          </p>
        </div>

        <div class="models">
          <article class="model" appReveal *ngFor="let model of models; let i = index" [style.--d]="delays[i]">
            <h3>{{ model.title }}</h3>
            <p>{{ model.subtitle }}</p>
            <ul>
              <li *ngFor="let bullet of model.bullets">{{ bullet }}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  `,
})
export class StaffingSectionComponent {
  readonly delays = ['0.12s', '0.2s', '0.28s'];

  readonly models = [
    {
      title: 'Modelo A',
      subtitle: 'Perfil Individual AI-Powered',
      bullets: [
        'Onboarding rapido con tu equipo',
        'Objetivos por sprint y resultados medibles',
        'Integracion con stack actual',
      ],
    },
    {
      title: 'Modelo B',
      subtitle: 'Squad Hibrido',
      bullets: [
        'Tech Lead, Engineers, Data/ML y QA',
        'Coordinacion con PMO y Arquitectura',
        'Velocidad con control tecnico',
      ],
    },
    {
      title: 'Modelo C',
      subtitle: 'Squad End-to-End',
      bullets: [
        'Discovery, build y operacion continua',
        'Cobertura MLOps y monitoreo',
        'Escala flexible por demanda',
      ],
    },
  ];
}
