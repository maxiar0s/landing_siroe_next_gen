import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <header class="hero" id="inicio">
      <div class="shell hero-layout">
        <div class="hero-main" appReveal style="--d: 0.1s">
          <p class="kicker">Chile - TaaS (Talent as a Service) - Next-Gen Staffing</p>
          <h1>Staffing IA con ADN IA para equipos que no pueden esperar.</h1>
          <p class="hero-copy">
            SIROE Next-Gen activa talento <strong>AI-Powered</strong> para transformar backlog en entregas,
            pilotos en productos y estrategia en ejecucion continua.
          </p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#staffing" (click)="staffingClick.emit()">Explorar Staffing IA</a>
            <a class="btn btn-ghost" href="#adn-ia" (click)="adnClick.emit()">Entender ADN IA</a>
          </div>
        </div>

        <aside class="hero-panel" appReveal style="--d: 0.25s" aria-label="Quick facts">
          <p class="panel-title">NEXT-GEN STAFFING</p>
          <ul>
            <li>Perfiles individuales AI-Powered en dias</li>
            <li>Squads IA listos para discovery y delivery</li>
            <li>Escalamiento por objetivos de negocio</li>
          </ul>
          <p class="panel-foot">Mercado foco: Chile</p>
        </aside>
      </div>

      <div class="ticker" aria-label="Tecnologias y AI Toolkit 2026">
        <div class="ticker-track">
          <span *ngFor="let badge of tickerBadges">{{ badge }}</span>
        </div>
      </div>
    </header>
  `,
})
export class HeroSectionComponent {
  @Output() staffingClick = new EventEmitter<void>();
  @Output() adnClick = new EventEmitter<void>();

  readonly tickerBadges = [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Python',
    'AWS',
    'Azure',
    'ChatGPT',
    'Claude',
    'GitHub Copilot',
    'LangChain',
    'Vector DB',
    'Agents',
    'RAG',
    'MLOps',
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Python',
    'AWS',
    'Azure',
    'ChatGPT',
    'Claude',
    'GitHub Copilot',
    'LangChain',
    'Vector DB',
    'Agents',
    'RAG',
    'MLOps',
  ];
}
