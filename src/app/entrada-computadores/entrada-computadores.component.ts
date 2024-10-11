import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';


@Component({
  selector: 'app-entrada-computadores',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './entrada-computadores.component.html',
  styleUrl: './entrada-computadores.component.css'
})
export class EntradaComputadoresComponent implements OnInit {
  public entradaform!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService // Inyectar el servicio
  ) { }

  ngOnInit(): void {
    // Inicializamos el formulario reactivo
    this.entradaform = this.formBuilder.group({
      numeroIdentificacion: ['', Validators.required],
      serial: ['', Validators.required],
      marca: ['', Validators.required],
      color: ['', Validators.required],
      cargador: ['', Validators.required],
      mouse: ['', Validators.required]
    });
  }
  
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const documento_identidad = inputElement.value;
  
    // Verifica que el número de identificación no esté vacío
    if (documento_identidad) {
      // Llamar al servicio para obtener los datos del backend
      this.dataService.getData(documento_identidad).subscribe(
        (response) => {
          if (response && response.computador) {
            // Poner los datos en el formulario
            this.entradaform.patchValue({
              numeroIdentificacion: documento_identidad,
              serial: response.computador.serial,
              marca: response.computador.marca,
              color: response.computador.color,
              cargador: response.computador.cargador,
              mouse: response.computador.mouse
            });
          } else {
            console.error('Datos no encontrados para el documento de identidad proporcionado');
          }
        },
        (error) => {
          console.error('Error al obtener los datos:', error);
        }
      );
    } else {
      console.error('Debe ingresar un número de identificación');
    }
  }

  

}

//no retorno, ya no se que hacer para que esto funcione, estoy cansado jefe, si eres capaz piensa tal vez en volver a pedirle a chatgpt que haga una nueva función, intenta volver a ahcerlo, animo campeón!!!