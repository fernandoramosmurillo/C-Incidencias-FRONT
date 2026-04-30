import { environment } from '@env/environment';
import { Component, inject, Input, OnInit } from '@angular/core';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonCardContent, IonLabel, IonGrid, IonCol, IonRow, IonRouterOutlet } from "@ionic/angular/standalone";
import { LoginFormComponent } from "./login-form/login-form.component";
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'auth-card',
  templateUrl: './auth-card.component.html',
  imports: [IonRouterOutlet, IonRow, IonCol, IonGrid, IonLabel, IonCardContent, IonButton, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, LoginFormComponent, RouterLink, RouterOutlet],
  styleUrls: ['./auth-card.component.scss'],
})
export class AuthCardComponent {
  router = inject(Router)
  environment = environment;
}
