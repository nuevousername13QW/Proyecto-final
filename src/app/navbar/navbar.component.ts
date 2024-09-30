import { Component, EventEmitter, Output } from '@angular/core';
import { RegistroUsuarComponent } from '../registro-usuar/registro-usuar.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RegistroUsuarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() onViewChange = new EventEmitter<string>();

  // Función que emite el cambio de vista
  changeView(view: string) {
    this.onViewChange.emit(view);
  }
}
