import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdcompucarnetsService {
  private apiUrl = 'http://localhost:3000/api/obtener-idcomputador-carnet'; // URL de tu API base

  constructor(private http: HttpClient) { }

  // Método para obtener el idcomputador_carnet
  getIdComputadorCarnet(documento_identidad: string, serial: string): Observable<any> {
    const body = { documento_identidad, serial }; // Construir el cuerpo de la solicitud
    return this.http.post<any>(this.apiUrl, body); // Realizar la solicitud POST
  }
}
