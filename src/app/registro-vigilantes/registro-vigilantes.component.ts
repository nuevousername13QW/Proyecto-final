import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-registro-vigilantes',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro-vigilantes.component.html',
  styleUrl: './registro-vigilantes.component.css'
})
export class RegistroVigilantesComponent {
  registrovigi: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registrovigi = this.fb.group({
      documento_vigi: [''],
      nombrevigi: ['']
    });
  }

  onSubmit() {
    const formDataVigi = {
      documento_vigilante: this.registrovigi.value.documento_vigi,
      nombre: this.registrovigi.value.nombrevigi,
    }
    this.http.post('http://localhost:3000/api/insertarVigilante', formDataVigi).subscribe({
      next: response => {
        console.log('Datos enviados correctamente', response);
        this.registrovigi.reset();
      },
      error: error => {
        console.error('Error al enviar datos', error);
      }
    });
  }

}
