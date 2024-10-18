import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { IdcompucarnetsService } from '../idcompucarnets.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-salida-computadores',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './salida-computadores.component.html',
  styleUrls: ['./salida-computadores.component.css']
})
export class SalidaComputadoresComponent implements OnInit {
  public salidaform!: FormGroup;
  private idComputadorCarnet: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private idcompucarnetsService: IdcompucarnetsService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.salidaform = this.formBuilder.group({
      cedulaVigilante: ['', Validators.required],
      numeroIdentificacion: ['', Validators.required],
      serial: ['', Validators.required],
      marca: ['', Validators.required],
      color: ['', Validators.required],
      cargador: ['', Validators.required],
      mouse: ['', Validators.required]
    });
  }

  onInput(event: Event): void {
    const documento_identidad = this.salidaform.get('numeroIdentificacion')?.value;

    if (documento_identidad) {
      this.dataService.getData(documento_identidad).subscribe(
        (dataResponse) => {
          if (dataResponse && dataResponse.computador) {
            this.salidaform.patchValue({
              numeroIdentificacion: documento_identidad,
              serial: dataResponse.computador.serial,
              marca: dataResponse.computador.marca,
              color: dataResponse.computador.color,
              cargador: dataResponse.computador.cargador,
              mouse: dataResponse.computador.mouse
            });

            const serial = this.salidaform.get('serial')?.value;
            if (documento_identidad && serial) {
              this.idcompucarnetsService.getIdComputadorCarnet(documento_identidad, serial).subscribe(
                (response) => {
                  if (response && response.idcomputador_carnet) {
                    this.idComputadorCarnet = response.idcomputador_carnet;
                    console.log('ID Computador Carnet:', this.idComputadorCarnet);
                  } else {
                    console.error('ID no encontrado');
                  }
                },
                (error) => {
                  console.error('Error al obtener el ID:', error);
                }
              );
            } else {
              console.error('Debe ingresar el serial del computador');
            }
          } else {
            console.error('Datos no encontrados para el documento de identidad proporcionado');
          }
        },
        (error) => {
          console.error('Error al obtener los datos:', error);
        }
      );
    } else {
      console.error('Debe ingresar el número de identificación');
    }
  }

  onSubmit(): void {
    if (this.idComputadorCarnet) {
      console.log('Enviando registro a la base de datos'); // Log para depuración
      this.registrarEntradaSalida(this.idComputadorCarnet);
    } else {
      console.error('ID Computador Carnet no encontrado');
    }
  }
  registrarEntradaSalida(idcomputador_carnet: number) {
    const registroData = {
      documento_vigilante: this.salidaform.controls['cedulaVigilante'].value,
      id_compu_carnet: idcomputador_carnet
    };

    console.log('Datos del registro:', registroData); // Log para depuración

    this.http.post('http://localhost:3000/api/registroSalida', registroData).subscribe({
      next: () => {
        alert('Registro completado exitosamente.');
        this.salidaform.reset(); // Restablece el formulario a su estado inicial
        this.idComputadorCarnet = null; // Restablecer la variable idComputadorCarnet
      },
      error: (err) => {
        alert(err.error.mensaje);
      }
    });
}
}