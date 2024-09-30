import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import {ReactiveFormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { RegistroUsuarComponent } from './registro-usuar/registro-usuar.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ReactiveFormsModule,CommonModule, RegistroUsuarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'registro_sena_compucarnet';
  currentView: string = 'registro-usuar';

  // Función para cambiar el componente a mostrar
  setView(view: string) {
    this.currentView = view;
  }
}
