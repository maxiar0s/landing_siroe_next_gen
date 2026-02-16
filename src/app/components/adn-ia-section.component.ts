import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'app-adn-ia-section',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section class="section shell" id="adn-ia">
      <div class="section-head" appReveal style="--d: 0.06s">
        <p class="kicker">ADN IA</p>
        <h2>Instalamos capacidad estrategica y operativa, no solo tooling.</h2>
        <p>
          El enfoque ADN IA de SIROE conecta direccion ejecutiva, arquitectura tecnica y delivery para
          sostener impacto real en transformacion digital.
        </p>
      </div>

      <div class="cells">
        <article class="cell" appReveal style="--d: 0.12s" *ngFor="let cell of cells">
          <h3>{{ cell.title }}</h3>
          <p>{{ cell.subtitle }}</p>
          <small>{{ cell.description }}</small>
        </article>
      </div>
    </section>
  `,
})
export class AdnIaSectionComponent {
  readonly cells = [
    {
      title: 'Celula 01',
      subtitle: 'Estrategia de portafolio IA',
      description: 'Roadmap, priorizacion de casos y criterios de valor de negocio.',
    },
    {
      title: 'Celula 02',
      subtitle: 'Aceleracion de soluciones',
      description: 'Pilotos productivos con seguridad, datos, MLOps y observabilidad.',
    },
    {
      title: 'Celula 03',
      subtitle: 'Escalamiento organizacional',
      description: 'Transferencia de capacidades AI-Powered para operar y crecer.',
    },
  ];
}
