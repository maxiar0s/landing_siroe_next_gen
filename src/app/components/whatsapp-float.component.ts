import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-whatsapp-float',
  standalone: true,
  template: `
    <a
      class="whatsapp-float"
      href="https://wa.me/56988375496?text=Hola%2C%20me%20interesa%20conocer%20mas%20sobre%20Staffing%20IA%20de%20SIROE"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      (click)="whatsappClick.emit()"
    >
      WhatsApp
    </a>
  `,
})
export class WhatsappFloatComponent {
  @Output() whatsappClick = new EventEmitter<void>();
}
