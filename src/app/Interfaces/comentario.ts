import { DocumentReference, Timestamp } from '@angular/fire/firestore';
import { Usuario } from './usuario';

export interface Comentario {
  idComentario: string;
  texto: string;
  fechaPublicacion: Timestamp
  esPrivado: boolean;
  usuarioAutor: Usuario;
}
