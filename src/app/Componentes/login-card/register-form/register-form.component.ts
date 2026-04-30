import { Timestamp } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { IonInput, IonGrid, IonItem, IonLabel, IonCol, IonRow, IonList, IonText, IonButton, IonCheckbox, IonCard, IonCardContent, IonItemDivider, IonIcon, IonDatetime, IonDatetimeButton, IonModal } from "@ionic/angular/standalone";
import { RolesUsuario, TiposAcceso, Usuario } from 'src/app/Interfaces/usuario';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { environment } from '@env/environment';

@Component({
  selector: 'register-form', // Cambiado a register-form
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  standalone: true,
  imports: [IonModal, IonDatetimeButton, IonDatetime, IonIcon, IonItemDivider, IonCardContent, IonCard, IonCheckbox, IonButton, IonText, IonList, IonRow, IonCol, IonLabel, IonItem, IonGrid, IonInput, FormsModule, ReactiveFormsModule],
})
export class RegisterFormComponent {

  public env = environment;

  fechaNacimientoMaxima: Timestamp = Timestamp.now()

  // FormGroup ajustado con todos los campos del registro
  registerForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(2)]),
    correoElectronico: new FormControl('', [Validators.required, Validators.email]),
    clave: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-zA-Z])(?=.*\\d).{8,}$')]),
    recibirNotificaciones: new FormControl(false)
  });

  onRegister() {
    if (this.registerForm.valid) {
      const datosFormulario = this.registerForm.value;

      // Mapeo a la interfaz Usuario (Partial)
      const datosUsuario: Partial<Usuario> = {
        nombre: datosFormulario.nombre!,
        apellidos: datosFormulario.apellidos!,
        correoElectronico: datosFormulario.correoElectronico!,
        clave: datosFormulario.clave!,
        recibirNotificaciones: datosFormulario.recibirNotificaciones || false,
        // Valores por defecto de tu interfaz
        rolUsuario: RolesUsuario.CIUDADANO,
        tipoAcceso: TiposAcceso.CORREO_CONTRASEÑA,
        estado: 'ACTIVO',
        bloqueado: false
      };

      console.log("Registrando Usuario:", datosUsuario);
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
      if (control.hasError('pattern')) return 'Debe contener al menos 1 número y letras';
    }
    return '';
  }
}
