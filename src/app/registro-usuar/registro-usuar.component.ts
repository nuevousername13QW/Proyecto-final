import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-registro-usuar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro-usuar.component.html',
  styleUrl: './registro-usuar.component.css'
})
export class RegistroUsuarComponent {
  registroForm:FormGroup ;

  constructor(private fb: FormBuilder) {
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
    console.log(this.registroForm.value);
  }
}
