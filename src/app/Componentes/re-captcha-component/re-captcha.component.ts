import { AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { reCaptchaService } from 'src/app/Services/reCaptchaService';
import { IonInput, IonContent, IonList, IonItem, IonLabel, IonButton} from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 're-captcha',
  templateUrl: './re-captcha.component.html',
  styleUrls: ['./re-captcha.component.scss'],
  imports: [IonButton, IonLabel, IonItem, IonList, IonInput, FormsModule]
})
export class reCaptchaComponent implements AfterViewInit {
  @Input() telefono = "";
  codigoSms = "";

  @Output() pushValidado = new EventEmitter<boolean>()

  seccionSms = signal(true)
  seccionValidar = signal(false)

  private recaptcha: reCaptchaService = inject(reCaptchaService)

  ngAfterViewInit() {
    // Inicializamos el captcha apuntando al ID del botón
    this.recaptcha.inicializarRecaptcha('recaptcha-container');
  }

  async solicitarSms() {
    try {
      await this.recaptcha.enviarSms('+34'+this.telefono);
      this.seccionSms.set(false)
      this.seccionValidar.set(true)
      alert('¡SMS enviado!');
    } catch (error) {
      console.error(error);
    }
  }

  async verificarCodigo() {
    const exito = await this.recaptcha.validarCodigo(this.codigoSms);
    if (exito) {
      this.pushValidado.emit()
      alert('¡Logueado correctamente!');
    } else {
      alert('Código incorrecto');
    }
  }
}
