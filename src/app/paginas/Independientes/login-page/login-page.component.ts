import { Component } from '@angular/core';
import { IonCol, IonRow, IonGrid, IonContent, IonRouterOutlet } from "@ionic/angular/standalone";
import { AuthCardComponent } from "src/app/Componentes/login-card/auth-card.component";

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  imports: [IonRouterOutlet, IonContent, IonRow, IonGrid, IonCol, AuthCardComponent],
})
export class LoginPageComponent {
}
