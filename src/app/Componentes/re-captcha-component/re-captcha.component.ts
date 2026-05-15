import { AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { reCaptchaService } from 'src/app/Services/reCaptchaService';
import { IonInput, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonNote } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 're-captcha',
  templateUrl: './re-captcha.component.html',
  styleUrls: ['./re-captcha.component.scss'],
  imports: [IonNote, IonIcon, IonButton, IonLabel, IonItem, IonList, IonInput, FormsModule]
})
export class reCaptchaComponent implements AfterViewInit {
  @Input() telefono = "";
  codigoSms = "";

  @Output() pushValidado = new EventEmitter<boolean>()

  seccionSms = signal(true)
  seccionValidar = signal(false)

  private recaptcha: reCaptchaService = inject(reCaptchaService)

  ngAfterViewInit() {
    setTimeout(() => {
      this.recaptcha.inicializarRecaptcha('recaptcha-container');
    }, 100);
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
