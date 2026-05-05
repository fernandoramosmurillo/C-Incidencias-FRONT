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

  // Fecha máxima (hoy)
  fechaNacimientoMaxima: Timestamp = Timestamp.now();

  // FormGroup
  registerForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    apellidos: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    dni: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{8}[A-Z]$'),
    ]),
    telefonoContacto: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern('^[0-9]{9}$'),
    ]),
    direccion: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    fechaNacimiento: new FormControl(
      new Date().toISOString(), // Usamos ISO String nativo
      [Validators.required],
    ),
    correoElectronico: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    clave: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[a-zA-Z])(?=.*\\d).{8,}$'),
    ]),
    recibirNotificaciones: new FormControl(false),
  });

  async onRegister() {
    if (this.registerForm.valid) {
      const datosFormulario = this.registerForm.value;

      try {
        const credencial = await createUserWithEmailAndPassword(
          this.auth,
          datosFormulario.correoElectronico!,
          datosFormulario.clave!,
        );

        // Mapeo a la interfaz Ciudadano
        const datosUsuario: Ciudadano = {
          idUsuario: credencial.user.uid,
          nombre: datosFormulario.nombre!,
          apellidos: datosFormulario.apellidos!,
          dni: datosFormulario.dni!,
          telefonoContacto: datosFormulario.telefonoContacto!,
          direccion: datosFormulario.direccion!,
          // Enviamos la fecha como string ISO
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

          // Fecha de creación en formato ISO string
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

        const datosFullUsuario = {
          ...datosUsuario,
          ...datosAuth,
        };

        const token = `Bearer ${await credencial.user.getIdToken()}`;

        this.localStorageService.guardarEnLocal('usuario', datosFullUsuario);

        await sendEmailVerification(credencial.user);
        await this.httpService.añadirDato('usuarios', datosUsuario);

        this.router.navigate(['/auth/verification-pending']);
      } catch (error: any) {
        deleteUser(this.auth.currentUser!)
        if (error.code === 'auth/email-already-in-use') {
          alert('Este correo ya está registrado.');
        } else {
          alert('Error: ' + error.message);
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
      if (control.hasError('minlength')) {
        const min = control.errors['minlength'].requiredLength;
        return `Mínimo ${min} caracteres`;
      }
      if (nombreControl === 'dni' && control.hasError('pattern'))
        return 'Formato de DNI inválido';
      if (nombreControl === 'telefonoContacto' && control.hasError('pattern'))
        return 'Debe tener 9 números';
      if (control.hasError('pattern'))
        return 'Debe contener al menos 1 número y letras';
    }
    return '';
  }
}
