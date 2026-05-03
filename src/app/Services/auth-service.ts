import { inject, Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, getIdToken } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  token: string = '';
  usuarioAutenticado: boolean = false;

  constructor() {

    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.token = await getIdToken(user);
        this.usuarioAutenticado = true;
      } else {
        this.token = '';
        this.usuarioAutenticado = false;
      }
    });
  }

  obtenerToken() {
    return this.token;
  }

  guardarToken(token: string) {
    this.token = token;
  }
}
