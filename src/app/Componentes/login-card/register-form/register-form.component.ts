import { Component } from '@angular/core';
import { IonInput, IonGrid, IonItem, IonLabel, IonCol, IonRow, IonList, IonText, IonButton, IonCheckbox, IonCard, IonCardContent, IonItemDivider, IonIcon, IonCardHeader, IonCardTitle } from "@ionic/angular/standalone";
import { Usuario } from 'src/app/Interfaces/usuario';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { environment } from '@env/environment';

@Component({
  selector: 'login-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  imports: [IonCardTitle, IonCardHeader, IonIcon, IonItemDivider, IonCardContent, IonCard, IonCheckbox, IonButton, IonText, IonList, IonRow, IonCol, IonLabel, IonItem, IonGrid, IonInput, FormsModule, ReactiveFormsModule],
})
export class LoginFormComponent {

  public env = environment;

  loginForm = new FormGroup({
    correoElectronico: new FormControl('', [Validators.required, Validators.email]),
    clave: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-zA-Z])(?=.*\\d).{8,}$')])
  })


  onLogin() {
    if (this.loginForm.valid) {

      const datosFormulario = this.loginForm.value;

      const datosUsuario: Partial<Usuario> = {
        correoElectronico: datosFormulario.correoElectronico!,
        clave: datosFormulario.clave!,
      };

      console.log("Datos", datosUsuario);
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
