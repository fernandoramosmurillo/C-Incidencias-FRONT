import { Component, OnInit, signal } from '@angular/core';
import { reCaptchaService } from 'src/app/Services/reCaptchaService';
import { IonInput, IonContent, IonList, IonItem, IonLabel, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-re-captcha',
  templateUrl: './re-captcha.component.html',
  styleUrls: ['./re-captcha.component.css'],
  imports: [IonButton, IonLabel, IonItem, IonList, IonContent, IonInput]
})
export class AuthComponent implements OnInit {
  telefono = signal("");
  codigoSms = signal("");

  constructor(private authService: reCaptchaService) {}

  ngOnInit() {
    // Inicializamos el captcha apuntando al ID del botón
    this.authService.inicializarRecaptcha('boton-enviar');
  }

  async solicitarSms() {
    try {
      await this.authService.enviarSms(this.telefono());
      alert('¡SMS enviado!');
    } catch (error) {
      console.error(error);
    }
  }

  async verificarCodigo() {
    const exito = await this.authService.validarCodigo(this.codigoSms());
    if (exito) {
      alert('¡Logueado correctamente!');
    } else {
      alert('Código incorrecto');
    }
  }
}
