import { DocumentReference, GeoPoint, Timestamp } from '@angular/fire/firestore';
import { Usuario } from './usuario';
import { Ciudadano } from './ciudadano';

// Opciones fijas para el estado (así no te equivocas al escribir)
export enum EstadosIncidencia {
  ABIERTA = 'ABIERTA',
  ASIGNADA = 'ASIGNADA',
  PENDIENTE = 'PENDIENTE',
  SOLUCIONADA = 'SOLUCIONADA',
  RECHAZADA = 'RECHAZADA'
}

// Opciones fijas para la prioridad
export enum Prioridades {
  MINIMO = 'MINIMO',
  BAJA = 'BAJA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
  MUY_ALTA = 'MUY_ALTA',
  URGENTE = 'URGENTE'
}

// Estructura principal de la Incidencia
export interface Incidencia {
  idIncidencia: string;
  titulo: string;
  descripcion: string;
  categorias: string[];

  ubicacion: GeoPoint;      // Coordenadas del mapa (GPS)
  imagenesUrl: string[];       // Link a las fotos de la incidencia

  fechaCreacion: Timestamp; // Cuándo se creó
  fechaCierre?: Timestamp;  // Cuándo se arregló (puede estar vacío)

  // Enlaces a otros documentos (como si fueran IDs)
  usuarioCiudadano: Ciudadano;
  valoracion?: any;

  // Lista de operarios asignados (puede ser más de uno, por eso es un array)
  listaOperarios: any;

  // Lista de enlaces a los mensajes del chat
  comentarios: any;

  prioridad: Prioridades;
  estadoIncidencia: EstadosIncidencia;
}
