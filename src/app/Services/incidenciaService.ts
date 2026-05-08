import { Incidencia } from '../Interfaces/incidencia';
import { inject, Injectable } from '@angular/core';
import { UsuarioService } from './usuarioService';
import { Vinculable } from '../Interfaces/vinculable';
import { BaseService } from './baseService';
import { Usuario } from '../Interfaces/usuario';

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

      let nuevaLista = this.vincularPropiedad<Incidencia, Usuario>(lista, 'usuarioCiudadano', new Map(this.usuarioService.datos().map?.((u) => [u.idUsuario, u]))) || [];

      return nuevaLista;
    });
  }
}
