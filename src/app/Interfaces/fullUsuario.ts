import { AuthUsuario } from "./AuthUsuario";
import { Usuario } from "./usuario";

export interface FullUsuario {
  datosUsuario: Usuario;
  datosAuth: AuthUsuario;
}
