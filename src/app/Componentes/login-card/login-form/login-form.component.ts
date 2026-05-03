import { LocalStorageService } from 'src/app/Services/local-storage-service';
import { Component, inject } from '@angular/core';
import {
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
  IonCheckbox,
  IonIcon,
} from '@ionic/angular/standalone';
import { Usuario } from 'src/app/Interfaces/usuario';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from '@env/environment';
import { HttpService } from 'src/app/Services/http-service';
import { FullUsuario } from 'src/app/Interfaces/fullUsuario';
import { AuthService } from 'src/app/Services/auth-service';
import { Auth } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  imports: [
    IonIcon,
    IonCheckbox,
    IonButton,
    IonList,
    IonLabel,
    IonItem,
    IonInput,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LoginFormComponent {
  public env = environment;
  public httpService = inject(HttpService);
  public auth = inject(Auth);
  public authService = inject(AuthService);
  public localStorageService = inject(LocalStorageService);
  public router = inject(Router);

  loginForm = new FormGroup({
    correoElectronico: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    clave: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[a-zA-Z])(?=.*\\d).{8,}$'),
    ]),
  });

  async onLogin() {
    if (this.loginForm.valid) {
      const datosFormulario = this.loginForm.value;

      const datosUsuario: Partial<Usuario> = {
        correoElectronico: datosFormulario.correoElectronico!,
        clave: datosFormulario.clave!,
      };

      try {
        // Inicio de sesión en Firebase
        const credential = await signInWithEmailAndPassword(
          this.auth,
          datosUsuario.correoElectronico!,
          datosUsuario.clave!,
        );

        const uid = credential.user.uid;

        // Verificación de email
        if (!credential.user.emailVerified) {
          alert(
            'Tu correo electrónico no está verificado, por favor, acceda a su correo para verificarlo :(',
          );
          return;
        }

        // Obtención de datos desde el backend (Java)
        const usuarioFull = await this.httpService
          .obtenerDato<FullUsuario>('usuarios/completo', uid)
          .catch((error) => {
            console.error('Error al obtener datos del usuario:', error);
            return null;
          });

        if (!usuarioFull) {
          console.error(
            'No se pudo obtener el usuario completo después de iniciar sesión.',
          );
          return;
        }

        // Guardado de sesión y navegación
        const token = await credential.user.getIdToken();
        this.authService.guardarToken(`Bearer ${token}`);
        this.authService.usuarioAutenticado = true;

        this.localStorageService.guardarEnLocal('usuario', usuarioFull);
        this.router.navigate(['app/home']);

        console.log('Se ha establecido la conexión, sesión iniciada');
      } catch (error: any) {
        // Manejo de errores de credenciales o conexión
        console.error('Error en el proceso de login:', error);
        alert('Correo o contraseña incorrectos.');
      }
    }
  }

  obtenerMensajeError(nombreControl: string): string {
    const control = this.loginForm.get(nombreControl);

    if (control && control.touched && control.errors) {
      if (control.hasError('required')) return 'Este campo es obligatorio';
      if (control.hasError('email')) return 'El formato del email no es válido';
      if (control.hasError('minlength'))
        return 'Debe tener al menos 8 caracteres';
      if (control.hasError('pattern'))
        return 'Debe contener al menos 1 numero y letras';
    }

    return ''; // Si no hay errores, devolvemos vacío
  }
}
