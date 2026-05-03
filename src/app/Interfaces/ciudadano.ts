import { Timestamp } from '@angular/fire/firestore';
import { Usuario } from './usuario';
import { Incidencia } from './incidencia';

// El ciudadano tiene todo lo de un Usuario normal + sus datos propios
export interface Ciudadano extends Usuario {

  dni: string;
  telefonoContacto: string;
  direccion: string;

  // Lista de sus incidencias (ya transformadas a objeto)
  incidenciasSolicitadas: Incidencia[];

  // Incidencias a las que ya les ha puesto nota
  incidenciasCalificadas: Incidencia[];
}
