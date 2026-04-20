import { Subscription } from 'rxjs';
import { HttpService } from './http-service';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T> {
  private suscripcion?: Subscription;
  protected HttpService: HttpService = inject(HttpService);

  datos: WritableSignal<T[]> = signal<T[]>([]);

  // Necesitaremos saber la URL del endpoint (ej: 'incidencias' o 'usuarios')
  protected abstract endpoint: string;

  cargarDatos(): void {
    this.suscripcion = this.HttpService.obtenerDatos<T>(
      this.endpoint,
    ).subscribe((data: T[]) => {
      this.datos.set(data);
    });
  }

  // Cuando el componente se destruye, cerramos la suscripción
  cerrarSuscripcion(): void {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
      console.log('Suscripción cerrada manualmente');
    }
  }
}
