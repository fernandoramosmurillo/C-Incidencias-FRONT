import { inject, Injectable } from "@angular/core";
import { Comentario } from "../Interfaces/comentario";
import { BaseService } from "./BaseService";
import { Usuario } from "../Interfaces/usuario";
import { UsuarioService } from "./usuarioService";

@Injectable({
  providedIn: 'root',
})
export class ComentarioService extends BaseService<Comentario> {
  usuarioService = inject(UsuarioService);

  override asignarModelos(): void {
    this.datos.update((comentarios) => this.vincularPropiedad<Comentario, Usuario>(comentarios, 'usuarioAutor', new Map((this.usuarioService.datos() || []).map((u) => [u.idUsuario, u]))));
  }
  protected override endpoint = 'comentarios';

  filtrarPublicos(comentarios: Comentario[] | null | undefined): Comentario[] {
    if (!comentarios) return [];
    return comentarios.filter(comentario => !comentario.esPrivado);
  }
}
