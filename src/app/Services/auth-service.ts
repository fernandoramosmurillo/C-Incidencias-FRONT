import { inject, Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, getIdToken } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  token: string = '';
  usuarioAutenticado: boolean = false;
  router = inject(Router);
  uid: string = '';

  constructor() {

    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.uid = user.uid;
        this.token = await getIdToken(user);
        this.usuarioAutenticado = true;
      } else {
        this.token = '';
        this.usuarioAutenticado = false;
        this.router.navigate(['/login']);
      }
    });
  }

  obtenerToken() {
    return this.token;
  }

  obtenerUid() {
    return this.uid;
  }

  guardarToken(token: string) {
    this.token = token;
  }

}
