import { Injectable } from "@angular/core";
import { Comentario } from "../Interfaces/comentario";
import { BaseService } from "./BaseService";

@Injectable({
  providedIn: 'root',
})
export class ComentarioService extends BaseService<Comentario> {
  protected override endpoint = 'comentarios';

  filtrarPublicos(comentarios: Comentario[] | null | undefined): Comentario[] {
    if (!comentarios) return [];
    return comentarios.filter(comentario => !comentario.esPrivado);
  }
}
