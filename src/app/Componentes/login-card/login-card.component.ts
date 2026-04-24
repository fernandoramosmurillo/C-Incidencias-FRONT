import { environment } from '@env/environment';
import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonCardContent, IonLabel } from "@ionic/angular/standalone";

@Component({
  selector: 'login-card',
  templateUrl: './login-card.component.html',
  imports: [IonLabel, IonCardContent, IonButton, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard],
  styleUrls: ['./login-card.component.scss'],
})
export class LoginCardComponent {

  environment = environment;

}
