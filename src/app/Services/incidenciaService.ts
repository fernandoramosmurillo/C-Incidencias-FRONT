import { Incidencia } from '../Interfaces/incidencia';
import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import { UsuarioService } from './usuarioService';
import { Vinculable } from '../Interfaces/vinculable';
import { Ciudadano } from '../Interfaces/ciudadano';
import { BaseService } from './BaseService';

@Injectable({
  providedIn: 'root',
})
export class IncidenciaService extends BaseService<Incidencia> implements Vinculable {
  protected override endpoint: string = 'incidencias';

  usuarioService: UsuarioService = inject(UsuarioService)

  constructor() {
    super();
    effect(() => {
      const listaIncidencias = this.datos();
      const listaCiudadanos = this.usuarioService.datos();

      if (listaIncidencias.length > 0 && listaCiudadanos.length > 0) {
        // Evitamos que se vuelva a ejecutar el efecto al actualizar las incidencias con los usuarios asignados
        untracked(() => {
          this.asignarModelos();
        });
      }
    }, { allowSignalWrites: true });
  }

  asignarModelos() {
    const usuarioMap = new Map(this.usuarioService.datos().map(usuario => [usuario.idUsuario, usuario]));

    this.datos.update(lista => {
      lista.forEach(incidencia => {
        //Asignacion de usuarios
        const ciudadano = usuarioMap.get(incidencia.usuarioCiudadano.idUsuario);
        if (ciudadano) incidencia.usuarioCiudadano = ciudadano as Ciudadano;
      });
      return [...lista];
    });
  }
}
