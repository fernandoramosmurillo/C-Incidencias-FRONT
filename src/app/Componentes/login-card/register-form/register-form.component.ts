import { LocalStorageService } from './../../../Services/local-storage-service';
import { Router } from '@angular/router';
import { HttpService } from './../../../Services/http-service';
import { Firestore, Timestamp } from '@angular/fire/firestore'; // Eliminamos Timestamp de aquí
import { Component, inject } from '@angular/core';
import {
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
  IonCheckbox,
  IonIcon,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
} from '@ionic/angular/standalone';
import { Estados, RolesUsuario, TiposAcceso } from 'src/app/Interfaces/usuario';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from '@env/environment';
import { Ciudadano } from 'src/app/Interfaces/ciudadano';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from '@angular/fire/auth';
import { deleteUser } from 'firebase/auth';
import { AuthUsuario } from 'src/app/Interfaces/AuthUsuario';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  standalone: true,
  imports: [
    IonModal,
    IonDatetimeButton,
    IonDatetime,
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
export class RegisterFormComponent {
  public env = environment;
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private httpService = inject(HttpService);
  private router = inject(Router);
  private localStorageService = inject(LocalStorageService);

  fechaNacimientoMaxima: Timestamp = Timestamp.now();

  registerForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(2)]),
    dni: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8}[A-Z]$')]),
    telefonoContacto: new FormControl<string | null>(null, [Validators.required, Validators.pattern('^[0-9]{9}$')]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(5)]),
    fechaNacimiento: new FormControl(new Date().toISOString(), [Validators.required]),
    correoElectronico: new FormControl('', [Validators.required, Validators.email]),
    clave: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-zA-Z])(?=.*\\d).{8,}$')]),
    recibirNotificaciones: new FormControl(false),
  });

  async onRegister() {
    if (this.registerForm.valid) {
      const datosFormulario = this.registerForm.value;

      try {
        // CAMBIO: Obtenemos datos una sola vez
        const usuarios: Ciudadano[] = await this.httpService.obtenerDatos('usuarios');

        // CAMBIO: Validación unificada más eficiente (usamos find para obtener el motivo exacto)
        const dniExistente = usuarios.find(u => u.dni === datosFormulario.dni);
        const emailExistente = usuarios.find(u =>
          u.correoElectronico?.toLowerCase() === datosFormulario.correoElectronico?.toLowerCase()
        );

        if (dniExistente) {
          alert('El DNI ya se encuentra registrado.');
          return;
        }

        if (emailExistente) {
          alert('El correo electrónico ya está en uso.');
          return;
        }

        const credencial = await createUserWithEmailAndPassword(
          this.auth,
          datosFormulario.correoElectronico!,
          datosFormulario.clave!,
        );

        const datosUsuario: Ciudadano = {
          idUsuario: credencial.user.uid,
          nombre: datosFormulario.nombre!,
          apellidos: datosFormulario.apellidos!,
          dni: datosFormulario.dni!,
          telefonoContacto: datosFormulario.telefonoContacto!,
          direccion: datosFormulario.direccion!,
          fechaNacimiento: new Date(datosFormulario.fechaNacimiento!).toISOString(),
          correoElectronico: datosFormulario.correoElectronico!,
          clave: datosFormulario.clave!,
          recibirNotificaciones: datosFormulario.recibirNotificaciones || false,
          rolUsuario: RolesUsuario.CIUDADANO,
          tipoAcceso: TiposAcceso.CORREO_CONTRASEÑA,
          estado: Estados.EN_BORRADOR,
          bloqueado: false,
          incidenciasSolicitadas: [],
          incidenciasCalificadas: [],
          fechaCreacion: new Date().toISOString(),
          fechaEliminacion: null,
          fotoPerfilUrl: null,
          notificacionesRecibidas: [],
        };

        const datosAuth: AuthUsuario = {
          uid: credencial.user.uid,
          email: credencial.user.email!,
          verificado: credencial.user.emailVerified,
          nombre: datosUsuario.nombre,
          foto: datosUsuario.fotoPerfilUrl || '',
        };


        //Guardado de datos
        const datosFullUsuario = { ...datosUsuario, ...datosAuth };

        this.localStorageService.guardarEnLocal('usuario', datosFullUsuario);

        await sendEmailVerification(credencial.user);
        await this.httpService.añadirDato('usuarios', datosUsuario);

        this.router.navigate(['/auth/verification-pending']);

      } catch (error: any) {
        //Verificación de currentUser antes de intentar borrar para evitar errores en cascada
        if (this.auth.currentUser) {
          await deleteUser(this.auth.currentUser);
        }

        if (error.code === 'auth/email-already-in-use') {
          alert('Este correo ya está registrado.');
        } else {
          alert('Error: ' + (error.error?.mensaje || error.message));
        }
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  obtenerMensajeError(nombreControl: string): string {
    const control = this.registerForm.get(nombreControl);
    if (control && control.touched && control.errors) {
      if (control.hasError('required')) return 'Este campo es obligatorio';
      if (control.hasError('email')) return 'El formato del email no es válido';
      if (control.hasError('minlength')) return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
      if (nombreControl === 'dni' && control.hasError('pattern')) return 'Formato de DNI inválido';
      if (nombreControl === 'telefonoContacto' && control.hasError('pattern')) return 'Debe tener 9 números';
      if (control.hasError('pattern')) return 'Debe contener al menos 1 número y letras';
    }
    return '';
  }
}
