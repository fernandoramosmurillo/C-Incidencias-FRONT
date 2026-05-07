import { LocalStorageService } from './Services/local-storage-service';
import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { caretDownCircle, caretDownSharp, create, home, listOutline, logoAndroid, logoApple, logoGoogle, search} from 'ionicons/icons'
import { Router } from "@angular/router";
import { Usuario } from './Interfaces/usuario';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonRouterOutlet, IonApp],
})
export class AppComponent implements OnInit {

  private localstorageService = inject(LocalStorageService);
  private router = inject(Router);

  constructor() {
    addIcons({
      home,
      create,
      listOutline,
      logoGoogle,
      logoApple,
      logoAndroid,
      caretDownSharp
    });
  }

  ngOnInit() {
    this.comprobarSesion();
  }

  private comprobarSesion() {
    const usuario:Usuario = this.localstorageService.obtenerDeLocal('usuario');

    if (!usuario) {
      this.router.navigate(['auth/login'], { replaceUrl: true });
      console.log("No se ha encontrado ningun usuario autenticado, redirigiendo a login...");
    } else {
      console.log('Sesión detectada para el usuario:', usuario.idUsuario);
    }
  }
}
