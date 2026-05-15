import { Injectable, inject } from '@angular/core';
// Importa TODO desde @angular/fire/auth
import {
  Auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult
} from '@angular/fire/auth'; 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class reCaptchaService {
  private auth = inject(Auth);
  private confirmationResult?: ConfirmationResult;
  private recaptchaVerifier?: RecaptchaVerifier;

  public inicializarRecaptcha(idElemento: string) {
    this.auth.languageCode = 'es';

    this.recaptchaVerifier = new RecaptchaVerifier(this.auth, idElemento, {
      size: 'invisible',
      callback: () => {},
    });
  }

  public async enviarSms(telefono: string) {
    if (!this.recaptchaVerifier) {
      throw new Error('reCAPTCHA no inicializado');
    }

    try {
      this.confirmationResult = await signInWithPhoneNumber(
        this.auth,
        telefono,
        this.recaptchaVerifier,
      );

      console.log('SMS enviado con éxito');
    } catch (error) {
      console.error('Error enviando SMS:', error);
      // Alternativa limpia nativa de Firebase si el widget se queda bloqueado:
      if (this.recaptchaVerifier) {
        this.recaptchaVerifier.clear();
        this.inicializarRecaptcha('recaptcha-container');
      }
    }
  }

  public async validarCodigo(codigo: string): Promise<boolean> {
    if (!this.confirmationResult) return false;

    try {
      const result = await this.confirmationResult.confirm(codigo);
      return !!result.user;
    } catch (error) {
      console.error('Código inválido:', error);
      return false;
    }
  }
}
