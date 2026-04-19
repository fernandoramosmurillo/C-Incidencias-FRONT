/** * Interfaz de Usuario
 * Estructura simple para tipado de datos.
 */

import { Timestamp } from "firebase/firestore";

export enum RolesUsuario {
  ADMINISTRADOR = 'ADMINISTRADOR',
  OPERARIO = 'OPERARIO',
  CIUDADANO = 'CIUDADANO'
}

export enum TiposAcceso {
  CORREO_CONTRASEÑA = 'CORREO_CONTRASEÑA',
  GOOGLE = 'GOOGLE',
  CLAVE_ADMIN = 'CLAVE_ADMIN'
}

export interface Usuario {
  // Estado (ModeloBase)
  estado: string;

  // Datos personales
  idUsuario: string;
  nombre: string;
  apellidos: string;
  correoElectronico: string;
  clave: string;

  // Fechas (Timestamp de Firestore)
  fechaNacimiento: Timestamp | null;
  fechaCreacion: Timestamp | null;
  fechaEliminacion: Timestamp | null;

  // Perfil y Permisos
  rolUsuario: RolesUsuario;
  fotoPerfilUrl: string | null;
  tipoAcceso: TiposAcceso;

  // Flags
  bloqueado: boolean;
  recibirNotificaciones: boolean;

  // Referencias
  notificacionesRecibidas: string[];
}
