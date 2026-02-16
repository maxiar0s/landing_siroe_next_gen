import { Component } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  template: `
    <nav class="top-nav shell" aria-label="Principal">
      <a class="brand" href="#inicio" aria-label="SIROE Next-Gen inicio">
        <span class="brand-square"></span>
        <span>SIROE Next-Gen</span>
      </a>
      <div class="nav-links">
        <a href="#adn-ia">ADN IA</a>
        <a href="#staffing">Staffing IA</a>
        <a href="#toolkit">AI Toolkit 2026</a>
        <a class="nav-cta" href="#contacto">Hablemos hoy</a>
      </div>
    </nav>
  `,
})
export class TopNavComponent {}
