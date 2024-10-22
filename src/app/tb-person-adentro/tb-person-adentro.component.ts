import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../personas-dentro.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, ],
  selector: 'app-tb-person-adentro',
  templateUrl: './tb-person-adentro.component.html',
  styleUrls: ['./tb-person-adentro.component.css']
})
export class TbPersonAdentroComponent implements OnInit {
  personas: any[] = []; // Aquí se guardarán las personas que están "dentro"

  constructor(private personasService: PersonasService) {}

  ngOnInit(): void {
    this.personasService.getPersonasDentro().subscribe(
      (data) => {
        this.personas = data;
        console.log(this.personas); // Verifica los datos aquí
      },
      (error) => {
        console.error('Error al obtener personas dentro:', error);
      }
    );
  }
  salidaMasiva() {
    this.personasService.salidaMasiva().subscribe(
      (response: any) => {
        alert(response.message);
        // Aquí podrías volver a obtener las personas si es necesario
        this.ngOnInit(); // Actualiza la lista de personas después de la salida masiva
      },
      (error) => {
        console.error('Error al actualizar los estados:1', error);
        alert('Error al actualizar los estados.');
      }
    );
  }
}
