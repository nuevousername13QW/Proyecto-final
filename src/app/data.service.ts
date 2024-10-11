import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000/api/obtenerDatos'; // URL de tu API

  constructor(private http: HttpClient) { }

  // Método para obtener los datos
  getData(documento_identidad: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${documento_identidad}`);
  }
  

  // Método para actualizar los datos (opcional)
  updateData(id: number, formData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }
}
