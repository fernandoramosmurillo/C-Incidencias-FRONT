/** * Interfaz de Usuario
 * Estructura simple para tipado de datos.
 */

import { Timestamp } from 'firebase/firestore';

export enum Estados {
  ACTIVO = 'ACTIVO',
  ELIMINADO = 'ELIMINADO',
  EN_BORRADOR = 'EN_BORRADOR',
  BLOQUEADO = 'BLOQUEADO',
  INACTIVO = 'INACTIVO',
}

export enum RolesUsuario {
  ADMINISTRADOR = 'ADMINISTRADOR',
  OPERARIO = 'OPERARIO',
  CIUDADANO = 'CIUDADANO',
}

export enum TiposAcceso {
  CORREO_CONTRASEÑA = 'CORREO_CONTRASEÑA',
  EXTERNO = 'EXTERNO',
  CLAVE_ADMIN = 'CLAVE_ADMIN',
  CODIGO = 'CODIGO',
}

export interface Usuario {
  // Estado (ModeloBase)
  estado: string;

  // Datos personales
  idUsuario: string;
  nombre: string;
  apellidos: string;
  correoElectronico: string;

  // Fechas (Timestamp de Firestore)
  fechaNacimiento: string;
  fechaCreacion: string;
  fechaEliminacion: string | null;

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
