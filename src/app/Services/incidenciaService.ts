import { Subscription } from 'rxjs';
import { Incidencia } from '../Interfaces/incidencia';
import { HttpService } from './http-service';
import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import { UsuarioService } from './usuarioService';

@Injectable({
  providedIn: 'root',
})
export class IncidenciaService {
  private suscripcionIncidencias?: Subscription;

  HttpService: HttpService = inject(HttpService);
  usuarioService: UsuarioService = inject(UsuarioService)

  incidencias = signal<Incidencia[]>([]);

  constructor() {
    effect(() => {
      const listaIncidencias = this.incidencias();
      const listaUsuarios = this.usuarioService.usuarios();

      if (listaIncidencias.length > 0 && listaUsuarios.length > 0) {
        // Evitamos que se vuelva a ejecutar el efecto al actualizar las incidencias con los usuarios asignados
        untracked(() => {
          this.asignarModelos();
        });
      }
    }, { allowSignalWrites: true });
  }

  cargarDatos(): void {
    this.suscripcionIncidencias = this.HttpService.obtenerDatos<Incidencia>(
      'incidencias',
    ).subscribe((data: Incidencia[]) => {
      this.incidencias.set(data);
    });
  }

  asignarModelos() {
    const usuarioMap = new Map(this.usuarioService.usuarios().map(usuario => [usuario.idUsuario, usuario]));

    this.incidencias.update(lista => {
      lista.forEach(incidencia => {
        //Asignacion de usuarios
        const usuario = usuarioMap.get(incidencia.usuarioCiudadano.idUsuario);
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
