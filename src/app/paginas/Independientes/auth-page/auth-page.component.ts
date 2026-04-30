import { Component, inject } from '@angular/core';
import { IonCol, IonRow, IonGrid, IonContent, IonRouterOutlet } from "@ionic/angular/standalone";
import { AuthCardComponent } from "src/app/Componentes/login-card/auth-card.component";
import { Router, RouterOutlet } from "@angular/router";

@Component({
  selector: 'auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  imports: [IonRouterOutlet, IonContent, IonRow, IonGrid, IonCol, AuthCardComponent, RouterOutlet],
})
export class AuthPageComponent {

}
