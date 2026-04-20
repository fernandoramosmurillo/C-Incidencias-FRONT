import { Subscription } from 'rxjs';
import { HttpService } from './http-service';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T> {
  private suscripcion?: Subscription;
  protected httpService: HttpService = inject(HttpService);

  datos: WritableSignal<T[]> = signal<T[]>([]);

  // Necesitaremos saber la URL del endpoint (ej: 'incidencias' o 'usuarios')
  protected abstract endpoint: string;

  cargarDatos(): Promise<void> {
    return this.httpService.obtenerDatos<T>(this.endpoint).then((respuesta) => {
      this.datos.set(respuesta);
    });
  }

  protected extraerId(referencia: any): string {
    if (typeof referencia === 'string')
      return referencia.split('/').pop() || '';
    return referencia?.idUsuario || '';
  }
}
