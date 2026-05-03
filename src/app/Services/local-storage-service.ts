import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

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
}
