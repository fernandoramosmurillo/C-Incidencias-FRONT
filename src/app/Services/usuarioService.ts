import { Usuario } from '../Interfaces/usuario';
import { Injectable, computed } from '@angular/core';
import { BaseService } from './BaseService';

@Injectable({
  providedIn: 'root',
})
// Ahora UsuarioService es un BaseService de tipo Usuario
export class UsuarioService extends BaseService<Usuario> {
  protected override endpoint = 'usuarios';

  cargarDatosCiudadanos() {
    this.HttpService.obtenerCiudadanosHttp().subscribe((data: Usuario[]) => {
      this.datos.set(data); // Llenamos la señal del padre

    });
  }
}
