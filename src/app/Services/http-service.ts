import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../Interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  http: HttpClient = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:8080/api';

  obtenerDatos<T>(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.BASE_URL}/${endpoint}`);
  }

  obtenerDato<T>(endpoint: string, id: string): Observable<T> {
    return this.http.get<T>(`${this.BASE_URL}/${endpoint}/${id}`);
  }

  añadirDato<T>(endpoint: string, dato: T): Observable<T> {
    return this.http.post<T>(`${this.BASE_URL}/${endpoint}`, dato);
  }

  modificarDato<T>(endpoint: string, id: string, dato: T): Observable<T> {
    return this.http.put<T>(`${this.BASE_URL}/${endpoint}/${id}`, dato);
  }

  eliminarDato(endpoint: string, id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${endpoint}/${id}`);
  }

  cambiarEstado<T>(endpoint: string, id: string, nuevoEstado: string): Observable<T> {
    return this.http.put<T>(`${this.BASE_URL}/${endpoint}/${id}/estado/${nuevoEstado}`,null);
  }

  obtenerCiudadanosHttp() {
    return this.obtenerDatos<Usuario>('usuarios?rol=CIUDADANO');
  }
}

