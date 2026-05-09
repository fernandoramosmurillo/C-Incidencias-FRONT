
import { AuthUsuario } from "./authUsuario";
import { Usuario } from "./usuario";

export interface FullUsuario {
  datosUsuario: Usuario;
  datosAuth: AuthUsuario;
}
