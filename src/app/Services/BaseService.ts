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
  protected extraerIds(referencias: any[]): string[] {
    if (!referencias || !Array.isArray(referencias)) return [];
    return referencias.map((ref) => this.extraerId(ref));
  }

  protected extraerId(referencia: any): string {
    if (!referencia) return '';
    return referencia.split('/').pop() || '';
  }

  protected vincularPropiedad<T, R>(
    lista: T[],
    propiedad: keyof T,
    mapa: Map<string, R | R[]>,
  ): T[] {
    return lista.map((item) => {
      const referencia = item[propiedad];

      if (!referencia) return item;

      if (Array.isArray(referencia)) {
        const idsLimpios = this.extraerIds(referencia);
        const vinculados = idsLimpios
          .map((id) => mapa.get(id))
          .filter((val) => val !== undefined) as R[];

        return {
          ...item,
          [propiedad]: vinculados,
        };
      }

      const idLimpio = this.extraerId(referencia);
      const vinculado = mapa.get(idLimpio);

      if (vinculado) {
        return {
          ...item,
          [propiedad]: vinculado,
        };
      }

      return item;
    });
  }

  abstract asignarModelos(): void;
}
