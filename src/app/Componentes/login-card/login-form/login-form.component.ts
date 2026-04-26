import { Component } from '@angular/core';
import { IonInput, IonGrid, IonItem, IonLabel, IonCol, IonRow, IonList, IonText, IonButton, IonCheckbox, IonCard, IonCardContent, IonItemDivider, IonIcon } from "@ionic/angular/standalone";
import { RolesUsuario, TiposAcceso, Usuario } from 'src/app/Interfaces/usuario';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { environment } from '@env/environment';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  imports: [IonIcon, IonItemDivider, IonCardContent, IonCard, IonCheckbox, IonButton, IonText, IonList, IonRow, IonCol, IonLabel, IonItem, IonGrid, IonInput, FormsModule, ReactiveFormsModule],
})
export class LoginFormComponent {

  public env = environment;

  usuario: Usuario = {
    estado: '',
    idUsuario: '',
    nombre: '',
    apellidos: '',
    correoElectronico: '',
    clave: '',
    fechaNacimiento: null,
    fechaCreacion: null,
    fechaEliminacion: null,
    fotoPerfilUrl: null,
    bloqueado: false,
    recibirNotificaciones: false,
    notificacionesRecibidas: [],
    rolUsuario: RolesUsuario.CIUDADANO,
    tipoAcceso: TiposAcceso.CORREO_CONTRASEÑA
  };

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-zA-Z])(?=.*\\d).{8,}$')])
  })


  onLogin() {
    if (this.loginForm.valid) {
      // TODO OK: Ir a la siguiente pantalla
    } else {
      // ERROR: Forzar a que la interfaz se pinte de rojo para avisar al usuario
      this.loginForm.markAllAsTouched();
    }
  }

  obtenerMensajeError(nombreControl: string): string {
    const control = this.loginForm.get(nombreControl);

    if (control && control.touched && control.errors) {
      if (control.hasError('required')) return 'Este campo es obligatorio';
      if (control.hasError('email')) return 'El formato del email no es válido';
      if (control.hasError('minlength')) return 'Debe tener al menos 8 caracteres';
      if (control.hasError('pattern')) return 'Debe contener al menos 1 numero y letras';
    }

    return ''; // Si no hay errores, devolvemos vacío
  }
}
