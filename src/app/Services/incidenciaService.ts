import { Subscription } from 'rxjs';
import { Incidencia } from '../Interfaces/incidencia';
import { HttpService } from './http-service';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IncidenciaService {
  private suscripcionIncidencias?: Subscription;
  HttpService: HttpService = inject(HttpService);

  incidencias: Incidencia[] = [];

  cargarDatos(): void {
    this.suscripcionIncidencias = this.HttpService.obtenerDatos<Incidencia>(
      'incidencias',
    ).subscribe((data: Incidencia[]) => {
      this.incidencias = data;
      console.log('Datos cargados con éxito');
    });
  }

  // Cuando el componente se destruye, cerramos la suscripción
  cerrarSuscripcion(): void {
    if (this.suscripcionIncidencias) {
      this.suscripcionIncidencias.unsubscribe();
      console.log('Suscripción cerrada manualmente');
    }
  }
}
