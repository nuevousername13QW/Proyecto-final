import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonasService {
  private apiUrl = 'http://localhost:3000/api'; // Ajusta la URL si es necesario

  constructor(private http: HttpClient) {}

  getPersonasDentro(): Observable<any> {
    return this.http.get(`${this.apiUrl}/personasDentro`);
  }

  salidaMasiva(): Observable<any> {
    return this.http.post(`${this.apiUrl}/salidaMasiva`, {});
  }
}
