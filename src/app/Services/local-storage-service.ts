import { inject, Injectable } from '@angular/core';
import { Usuario } from '../Interfaces/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  private router = inject(Router);

  // Guarda cualquier objeto o string en LocalStorage
  guardarEnLocal(llave: string, valor: any) {
    const datos = typeof valor === 'string' ? valor : JSON.stringify(valor);
    localStorage.setItem(llave, datos);
  }

  // Recupera datos de LocalStorage
  obtenerDeLocal(llave: string): any {
    const datos = localStorage.getItem(llave);
    if (!datos) return null;

    try {
      return JSON.parse(datos);
    } catch (e) {
      return datos; // Si no es un JSON, devuelve el string tal cual
    }
  }

  // Elimina un item específico de LocalStorage
  eliminarDeLocal(llave: string) {
    localStorage.removeItem(llave);
  }

  public comprobarSesion(){
    const usuario:Usuario = this.obtenerDeLocal('usuario');

    if (!usuario) {
      this.router.navigate(['auth/login'], { replaceUrl: true });
      return false;
      console.log("No se ha encontrado ningun usuario autenticado, redirigiendo a login...");
    } else {
      console.log('Sesión detectada para el usuario:', usuario.idUsuario);
      return false;
    }
  }
}
