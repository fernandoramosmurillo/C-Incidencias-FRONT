import { ComentarioService } from './comentarioServicio';
import { Incidencia } from '../Interfaces/incidencia';
import { inject, Injectable } from '@angular/core';
import { UsuarioService } from './usuarioService';
import { Vinculable } from '../Interfaces/vinculable';
import { Usuario } from '../Interfaces/usuario';
import { Comentario } from '../Interfaces/comentario';
import { BaseService } from './BaseService';

@Injectable({
  providedIn: 'root',
})
export class IncidenciaService
  extends BaseService<Incidencia>
  implements Vinculable
{
  protected override endpoint: string = 'incidencias';

  usuarioService: UsuarioService = inject(UsuarioService);
  comentarioService : ComentarioService = inject(ComentarioService);

  override asignarModelos() {
    this.datos.update((lista) => {

      let nuevaLista = this.vincularPropiedad<Incidencia, Usuario>(lista, 'usuarioCiudadano', new Map(this.usuarioService.datos().map?.((u) => [u.idUsuario, u]))) || [];
      console.log(this.comentarioService.datos());
      nuevaLista = this.vincularPropiedad<Incidencia, Comentario>(nuevaLista, 'comentarios', new Map(this.comentarioService.datos().map?.((c) => [c.idComentario, c]))) || [];

      return nuevaLista;
    });
  }
}
