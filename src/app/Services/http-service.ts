import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly BASE_URL = 'http://localhost:8080/api';

  async obtenerDatos<T>(endpoint: string): Promise<T[]> {
    const options = {
      url: `${this.BASE_URL}/${endpoint}`,
    };
    const response: HttpResponse = await CapacitorHttp.get(options);
    return response.data as T[];
  }

  async obtenerDato<T>(endpoint: string, id: string): Promise<T> {
    const options = {
      url: `${this.BASE_URL}/${endpoint}/${id}`,
    };
    const response: HttpResponse = await CapacitorHttp.get(options);
    return response.data as T;
  }

  async añadirDato<T>(endpoint: string, dato: T): Promise<T> {
    const options = {
      url: `${this.BASE_URL}/${endpoint}`,
      data: dato,
      headers: { 'Content-Type': 'application/json' },
    };
    const response: HttpResponse = await CapacitorHttp.post(options);
    return response.data as T;
  }

  async modificarDato<T>(endpoint: string, id: string, dato: T): Promise<T> {
    const options = {
      url: `${this.BASE_URL}/${endpoint}/${id}`,
      data: dato,
      headers: { 'Content-Type': 'application/json' },
    };
    const response: HttpResponse = await CapacitorHttp.put(options);
    return response.data as T;
  }

  async eliminarDato(endpoint: string, id: string): Promise<any> {
    const options = {
      url: `${this.BASE_URL}/${endpoint}/${id}`,
    };
    const response: HttpResponse = await CapacitorHttp.delete(options);
    return response.data;
  }

  async cambiarEstado<T>(endpoint: string, id: string, nuevoEstado: string): Promise<T> {
    const options = {
      url: `${this.BASE_URL}/${endpoint}/${id}/estado/${nuevoEstado}`,
    };
    const response: HttpResponse = await CapacitorHttp.put(options);
    return response.data as T;
  }
}
