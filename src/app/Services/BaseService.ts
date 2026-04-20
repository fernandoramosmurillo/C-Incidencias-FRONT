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

  protected vincularPropiedad<T, R>(
    lista: T[],
    propiedad: keyof T,
    mapa: Map<string, R>,
  ): T[] {
    return lista.map((item) => {
      // 1. Obtenemos lo que hay ahora (el path de Java o el objeto parcial)
      const referencia = item[propiedad];

      // 2. Extraemos el ID limpio (usando tu método extraerId)
      const idLimpio = this.extraerId(referencia);

      // 3. Buscamos en el mapa que pasamos por parámetro
      const objetoVinculado = mapa.get(idLimpio);

      // 4. Si lo encontramos, inyectamos el objeto completo
      if (objetoVinculado) {
        return {
          ...item,
          [propiedad]: objetoVinculado,
        };
      }

      // Si no, devolvemos el item original
      return item;
    });
  }
}
