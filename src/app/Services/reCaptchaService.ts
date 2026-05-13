import { Injectable, inject } from '@angular/core';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult
} from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class reCaptchaService {
  private auth = getAuth();
  private confirmationResult: ConfirmationResult | undefined;
  private recaptchaVerifier: RecaptchaVerifier | undefined;

  public inicializarRecaptcha(telefono: string) {
    // Ponemos el idioma en español para el SMS y el captcha
    this.auth.languageCode = 'es';

    // Creamos el verificador vinculado al ID del botón 'boton-enviar'
    this.recaptchaVerifier = new RecaptchaVerifier(this.auth, 'boton-enviar', {
      size: 'invisible',
      callback: (response: any) => {
      }
    });
  }

  public async enviarSms(telefono: string) {
    if (!this.recaptchaVerifier) return;

    try {
      this.confirmationResult = await signInWithPhoneNumber(
        this.auth,
        telefono,
        this.recaptchaVerifier
      );
      console.log('SMS enviado con éxito');
    } catch (error) {
      console.error('Error enviando SMS:', error);
      // Si hay error, reseteamos el captcha para poder pulsar otra vez
      this.recaptchaVerifier.render().then(id => {
        (window as any).grecaptcha.reset(id);
      });
    }
  }

  public async validarCodigo(codigo: string): Promise<boolean> {
    if (!this.confirmationResult) return false;

    try {
      const result = await this.confirmationResult.confirm(codigo);
      return !!result.user; // Si devuelve usuario, la firma es válida
    } catch (error) {
      console.error('Código inválido:', error);
      return false;
    }
  }
}
