import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonIcon, IonText, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, mailUnreadOutline } from 'ionicons/icons';
import { LocalStorageService } from 'src/app/Services/local-storage-service';

@Component({
  selector: 'verification-pending',
  templateUrl: './verification-pending.component.html',
  styleUrls: ['./verification-pending.component.scss'],
  imports: [IonButton, IonText, IonIcon],
  standalone: true
})
export class VerificationPendingComponent implements OnInit {
  private router = inject(Router);
  public email: string = '';
  private localStorageService: LocalStorageService =
    inject(LocalStorageService);

  constructor() {
    addIcons({ mailUnreadOutline, arrowBackOutline });
  }

  ngOnInit() {
    const usuarioLocal = this.localStorageService.obtenerDeLocal('usuario');

    if (usuarioLocal && usuarioLocal.correoElectronico) {
      this.email = usuarioLocal.correoElectronico;
    } else {
      //Si no hay nada en local, intentamos mirar el state de la ruta
      this.email = 'tu correo electrónico';
    }
  }

  reintentarLogin() {
    this.router.navigate(['/auth/login']);
  }
}
