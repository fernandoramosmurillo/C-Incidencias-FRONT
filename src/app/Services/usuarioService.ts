import { computed, Injectable } from "@angular/core";
import { Usuario } from "../Interfaces/usuario";
import { BaseService } from "./baseService";

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends BaseService<Usuario> {
  protected override endpoint = 'usuarios';

  filtrarCiudadanos(usuarios: Usuario[]): Usuario[] {
    return usuarios.filter(u => u.rolUsuario === 'CIUDADANO');
  }
}
