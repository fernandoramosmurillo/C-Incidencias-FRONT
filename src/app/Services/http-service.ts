import { inject, Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { LocalStorageService } from './local-storage-service';
import { FullUsuario } from '../Interfaces/fullUsuario';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly BASE_URL = 'http://localhost:8080/api';
  private localStorageService = inject(LocalStorageService);
  private auth = inject(AuthService);

  private getHeaders() {
    // Obtenemos el token directamente del servicio (AuthService)
    const token = this.auth.obtenerToken();

    // Construimos las cabeceras
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json'
    };

    // Solo si hay token, añadimos el Authorization
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  async obtenerDatos<T>(endpoint: string): Promise<T[]> {
    const options = {
      url: `${this.BASE_URL}/${endpoint}`,
      headers: this.getHeaders()
    };
    const response: HttpResponse = await CapacitorHttp.get(options);
    return response.data as T[];
  }

  async obtenerDato<T>(endpoint: string, id: string): Promise<T> {
    const options = {
      url: `${this.BASE_URL}/${endpoint}/${id}`,
      headers: this.getHeaders()
    };
    const response: HttpResponse = await CapacitorHttp.get(options);
    return response.data as T;
  }

  async añadirDato<T>(endpoint: string, dato: T): Promise<T> {
    const options = {
      url: `${this.BASE_URL}/${endpoint}`,
      data: dato,
      headers: this.getHeaders()
    };
    const response: HttpResponse = await CapacitorHttp.post(options);
    return response.data as T;
  }

  async modificarDato<T>(endpoint: string, id: string, dato: T): Promise<T> {
    const options = {
      url: `${this.BASE_URL}/${endpoint}/${id}`,
      data: dato,
      headers: this.getHeaders()
    };
    const response: HttpResponse = await CapacitorHttp.put(options);
    return response.data as T;
  }

  async eliminarDato(endpoint: string, id: string): Promise<any> {
    const options = {
      url: `${this.BASE_URL}/${endpoint}/${id}`,
      headers: this.getHeaders()
    };
    const response: HttpResponse = await CapacitorHttp.delete(options);
    return response.data;
  }

  async cambiarEstado<T>(endpoint: string, id: string, nuevoEstado: string): Promise<T> {
    const options = {
      url: `${this.BASE_URL}/${endpoint}/${id}/estado/${nuevoEstado}`,
      headers: this.getHeaders()
    };
    const response: HttpResponse = await CapacitorHttp.put(options);
    return response.data as T;
  }

  /**
   * Método de utilidad por si necesitas el objeto completo en algún componente
   */
  obtenerFullUsuario(): FullUsuario | null {
    return this.localStorageService.obtenerDeLocal('usuario') as FullUsuario;
  }
}
