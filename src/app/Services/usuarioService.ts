import { Subscription } from 'rxjs';
import { HttpService } from './http-service';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../Interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private suscripcionUsuarios?: Subscription;
  HttpService: HttpService = inject(HttpService);

  usuarios:Usuario[] = [];

  cargarDatos(): void {
    this.suscripcionUsuarios = this.HttpService.obtenerDatos<Usuario>(
      'usuarios',
    ).subscribe((data:Usuario[]) => {
      this.usuarios = data;
      console.log('Datos cargados con éxito');
    });
  }

  // Cuando el componente se destruye, cerramos la suscripción
  cerrarSuscripcion(): void {
    if (this.suscripcionUsuarios) {
      this.suscripcionUsuarios.unsubscribe();
      console.log('Suscripción cerrada manualmente');
    }
  }
}
