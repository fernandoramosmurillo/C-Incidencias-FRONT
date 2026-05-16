import {
  DocumentReference,
  GeoPoint,
  Timestamp,
} from '@angular/fire/firestore';
import { Ciudadano } from './ciudadano';
import { Comentario } from './comentario';

// Opciones fijas para el estado (así no te equivocas al escribir)
export enum EstadosIncidencia {
  ABIERTA = 'ABIERTA',
  ASIGNADA = 'ASIGNADA',
  PENDIENTE = 'PENDIENTE',
  SOLUCIONADA = 'SOLUCIONADA',
  RECHAZADA = 'RECHAZADA',
}

// Opciones fijas para la prioridad
export enum Prioridades {
  MINIMO = 'MINIMO',
  BAJA = 'BAJA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
  MUY_ALTA = 'MUY_ALTA',
  URGENTE = 'URGENTE',
}

export enum Categorias {
  ALUMBRADO_PUBLICO = '💡 Alumbrado Público',
  VIA_PUBLICA = '🛣️ Vía Pública',
  LIMPIEZA_Y_RESIDUOS = '🗑️ Limpieza y Residuos',
  PARQUES_Y_JARDINES = '🌳 Parques y Jardines',
  SISTEMAS_DESAGUE = '🌊 Sistemas de Desagüe',
  SISTEMA_TUBERIAS = '🔧 Sistema de Tuberías',
  SEÑALES_Y_TRAFICO = '🚦 Señales y Tráfico',
  MOBILIARIO_URBANO = '🪑 Mobiliario Urbano',
  ANIMALES_Y_PLAGAS = '🦟 Animales y Plagas',
  OBRAS_Y_ESCOMBROS = '🏗️ Obras y Escombros',
}

// Estructura principal de la Incidencia
export interface Incidencia {
  idIncidencia: string;
  titulo: string;
  descripcion: string;
  categorias: string[];

  ubicacion: GeoPoint; // Coordenadas del mapa (GPS)
  imagenesUrl: string[]; // Link a las fotos de la incidencia

  fechaCreacion: Timestamp; // Cuándo se creó
  fechaCierre?: Timestamp; // Cuándo se arregló (puede estar vacío)

  // Enlaces a otros documentos (como si fueran IDs)
  usuarioCiudadano: Ciudadano;
  valoracion?: any;

  // Lista de operarios asignados (puede ser más de uno, por eso es un array)
  listaOperarios: any;

  // Lista de enlaces a los mensajes del chat
  comentarios: Comentario[];

  prioridad: Prioridades;
  estadoIncidencia: EstadosIncidencia;
}
