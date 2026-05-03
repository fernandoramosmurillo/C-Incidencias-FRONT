import { environment } from '@env/environment';
import { Component, inject } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonGrid, IonCol, IonRow } from "@ionic/angular/standalone";
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'auth-card',
  templateUrl: './auth-card.component.html',
  imports: [IonRow, IonCol, IonGrid, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, RouterLink, RouterOutlet],
  styleUrls: ['./auth-card.component.scss'],
})
export class AuthCardComponent {
  router = inject(Router)
  environment = environment;
}
