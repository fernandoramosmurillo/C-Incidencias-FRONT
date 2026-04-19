import { Subscription } from 'rxjs';
import { Incidencia } from '../Interfaces/incidencia';
import { HttpService } from './http-service';
import { inject, Injectable, signal } from '@angular/core';
import { UsuarioService } from './usuarioService';

@Injectable({
  providedIn: 'root',
})
export class IncidenciaService {
  private suscripcionIncidencias?: Subscription;

  HttpService: HttpService = inject(HttpService);
  usuarioService: UsuarioService = inject(UsuarioService)

  incidencias = signal<Incidencia[]>([]);

  cargarDatos(): void {
    this.suscripcionIncidencias = this.HttpService.obtenerDatos<Incidencia>(
      'incidencias',
    ).subscribe((data: Incidencia[]) => {
      this.incidencias.set(data);
      this.asignarModelos();
    });
  }

  asignarModelos() {
    this.incidencias.update(lista => {
      lista.forEach(incidencia => {
        const usuario = this.usuarioService.usuarios().find(usuario => usuario.idUsuario === incidencia.usuarioCiudadano.idUsuario);
          if (usuario) incidencia.usuarioCiudadano = usuario;
        });
      return [...lista];
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
