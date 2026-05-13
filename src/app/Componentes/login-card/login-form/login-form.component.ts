import { Ciudadano } from 'src/app/Interfaces/ciudadano';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { IonInput, IonItem, IonLabel, IonList, IonButton, IonIcon, IonCheckbox, IonInputPasswordToggle } from '@ionic/angular/standalone';

import { FullUsuario } from 'src/app/Interfaces/fullUsuario';
import { HttpService } from 'src/app/Services/http-service';
import { LocalStorageService } from 'src/app/Services/local-storage-service'; // Lo mantenemos solo para limpiar
import { environment } from '@env/environment';
import { RolesUsuario, Usuario } from 'src/app/Interfaces/usuario';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [
    IonIcon, IonButton, IonList, IonLabel, IonItem, IonInput,
    FormsModule, ReactiveFormsModule,
    IonInputPasswordToggle
],
})
export class LoginFormComponent {
  public env = environment;
  private httpService = inject(HttpService);
  private auth = inject(Auth);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

  loginForm = new FormGroup({
    correoElectronico: new FormControl('', [Validators.required, Validators.email]),
    clave: new FormControl('', [Validators.required])
  });

  private credential! : UserCredential;
  private fullUser! : FullUsuario;

  async onLogin() {
    if (this.loginForm.invalid) return;

    const { correoElectronico, clave } = this.loginForm.value;

    try {
      //Firebase Login
      this.credential = await signInWithEmailAndPassword(this.auth, correoElectronico!, clave!);
      const uid = this.credential.user.uid;

      if (!this.credential.user.emailVerified) {
        alert('Email no verificado');
        return;
      }

      //Si hay un usuario en local y no coincide con el que acaba de entrar, borramos todo lo anterior para evitar conflictos de datos
      const usuarioPrevio: FullUsuario = this.localStorageService.obtenerDeLocal('usuario');

      if (usuarioPrevio && usuarioPrevio.datosAuth?.uid !== uid) {
        console.log('Detectado cambio de usuario. Limpiando datos de sesión anterior...');
        this.localStorageService.eliminarDeLocal('usuario');
        // Se podrian colocar mas llaves en un futuro para limpiar
      }

      //Obtener datos de Java
      await this.obtenerDatosUsuario(uid);

      if (this.fullUser.datosUsuario.rolUsuario === RolesUsuario.ADMINISTRADOR || this.fullUser.datosUsuario.rolUsuario === RolesUsuario.OPERARIO) {
        await esperarPush();
      }

      //Iniciar sesión
      if (this.fullUser) {
        await this.establecerSesion();
      }

    } catch (error: any) {
      alert('Correo o contraseña incorrectos');
    }
  }

  private async establecerSesion() {
    this.localStorageService.guardarEnLocal('usuario', this.fullUser);

    // Navegación
    this.router.navigate(['app/inicio']);
  }

  private async obtenerDatosUsuario(uid: string) {
    const res = await this.httpService
      .obtenerDato<FullUsuario>('usuarios/completo', uid)
      .catch(() => null);

    if (res) {
      this.fullUser = {...res, datosUsuario: res.datosUsuario as Ciudadano};
    }
  }

  obtenerMensajeError(nombreControl: string): string {
    const control = this.loginForm.get(nombreControl);
    if (control?.touched && control?.errors) {
      if (control.hasError('required')) return 'Obligatorio';
      if (control.hasError('email')) return 'Email inválido';
    }
    return '';
  }
}



