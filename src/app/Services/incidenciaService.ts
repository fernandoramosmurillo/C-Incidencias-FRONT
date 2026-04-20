import { Incidencia } from '../Interfaces/incidencia';
import { inject, Injectable } from '@angular/core';
import { UsuarioService } from './usuarioService';
import { Vinculable } from '../Interfaces/vinculable';
import { BaseService } from './BaseService';
import { Ciudadano } from '../Interfaces/ciudadano';

@Injectable({
  providedIn: 'root',
})
export class IncidenciaService
  extends BaseService<Incidencia>
  implements Vinculable
{
  protected override endpoint: string = 'incidencias';

  usuarioService: UsuarioService = inject(UsuarioService);

  asignarModelos() {
    this.datos.update((lista) => {

      let nuevaLista = this.vincularCiudadanos(lista);

      return nuevaLista;
    });
  }

  vincularCiudadanos(lista: Incidencia[]): Incidencia[] {

    const listaCiudadanos: Ciudadano[] = this.usuarioService.filtrarCiudadanos(
      this.usuarioService.datos(),
    ) as Ciudadano[];

    const usuarioMap = new Map(
      listaCiudadanos.map((usuario) => [usuario.idUsuario, usuario]),
    );

    return lista.map((incidencia) => {
      const referenciaUsuarioCiudadano: string =
        incidencia.usuarioCiudadano as any;
      const ciudadano = usuarioMap.get(
        this.extraerId(referenciaUsuarioCiudadano),
      );

      if (ciudadano) {
        return {
          ...incidencia,
          usuarioCiudadano: ciudadano as Ciudadano,
        };
      }
      return incidencia;
    });
  }
}
