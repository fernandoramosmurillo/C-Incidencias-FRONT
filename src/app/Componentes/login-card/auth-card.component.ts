import { environment } from '@env/environment';
import { Component, Input, OnInit } from '@angular/core';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonCardContent, IonLabel, IonGrid, IonCol, IonRow } from "@ionic/angular/standalone";
import { LoginFormComponent } from "./login-form/login-form.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'auth-card',
  templateUrl: './auth-card.component.html',
  imports: [IonRow, IonCol, IonGrid, IonLabel, IonCardContent, IonButton, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, LoginFormComponent, RouterLink],
  styleUrls: ['./auth-card.component.scss'],
})
export class AuthCardComponent {

  environment = environment;
  @Input() titulo: string = "";

}
