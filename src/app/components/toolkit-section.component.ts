import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'app-toolkit-section',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section class="section toolkit" id="toolkit">
      <div class="shell" appReveal style="--d: 0.1s">
        <p class="kicker">AI Toolkit 2026</p>
        <h2>El estandar operativo de SIROE para construir con velocidad y criterio.</h2>
        <p>
          Playbooks, stack validado y buenas practicas para que cada equipo AI-Powered entregue calidad
          sostenida en ambientes de negocio exigentes.
        </p>
        <div class="tool-grid" aria-label="Elementos AI Toolkit 2026">
          <span *ngFor="let tool of tools">{{ tool }}</span>
        </div>
      </div>
    </section>
  `,
})
export class ToolkitSectionComponent {
  readonly tools = ['ChatGPT', 'Claude', 'GitHub Copilot', 'LangChain', 'Vector DB', 'Agents', 'RAG', 'MLOps'];
}
