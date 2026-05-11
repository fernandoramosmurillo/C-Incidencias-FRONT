import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonCard, IonCardHeader, IonIcon, IonButton, IonCardTitle, IonCardContent, IonText, IonCardSubtitle, IonLabel } from "@ionic/angular/standalone";

@Component({
  selector: 'happy-empty',
  templateUrl: './happy-empty.component.html',
  styleUrls: ['./happy-empty.component.scss'],
  imports: [IonLabel, IonCardSubtitle, IonText, IonCardContent, IonCardTitle, IonButton, IonCardHeader, IonCard, IonIcon],
})
export class HappyEmptyComponent {

  router = inject(Router);

}
