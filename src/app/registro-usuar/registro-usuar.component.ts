import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-registro-usuar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro-usuar.component.html',
  styleUrl: './registro-usuar.component.css'
})
export class RegistroUsuarComponent {
  registroForm:FormGroup ;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registroForm = this.fb.group({
      numeroIdentificacion: [''],
      nombreCompleto: [''],
      tipoUsuarios: [''],
      marca: [''],
      serial: [''],
      color: [''],
      cargador: [''],
      mouse: ['']
    });
  }

  onSubmit() {
    const formData = {
        documento_identidad: this.registroForm.value.numeroIdentificacion,
        Nomb_completo: this.registroForm.value.nombreCompleto,
        tipo_usuar: this.registroForm.value.tipoUsuarios,
        marca: this.registroForm.value.marca, 
        serial: this.registroForm.value.serial,
        color: this.registroForm.value.color,
        cargador: this.registroForm.value.cargador,
        mouse: this.registroForm.value.mouse
    };

    this.http.post('http://localhost:3000/api/insertar', formData).subscribe({
        next: response => {
            console.log('Datos enviados correctamente', response);
            this.registroForm.reset(); 
        },
        error: error => {
            console.error('Error al enviar datos', error);
        }
    });
} 
}