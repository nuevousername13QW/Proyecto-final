import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import {ReactiveFormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { RegistroUsuarComponent } from './registro-usuar/registro-usuar.component';
import { EntradaComputadoresComponent } from "./entrada-computadores/entrada-computadores.component";
import { SalidaComputadoresComponent } from "./salida-computadores/salida-computadores.component";
import { RegistroVigilantesComponent } from "./registro-vigilantes/registro-vigilantes.component";
import { TbPersonAdentroComponent } from './tb-person-adentro/tb-person-adentro.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ReactiveFormsModule, CommonModule, RegistroUsuarComponent, EntradaComputadoresComponent, SalidaComputadoresComponent, RegistroVigilantesComponent, TbPersonAdentroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'registro_sena_compucarnet';
  currentView: string = 'entrada-computadores';

  // Función para cambiar el componente a mostrar
  setView(view: string) {
    this.currentView = view;
  }
}
