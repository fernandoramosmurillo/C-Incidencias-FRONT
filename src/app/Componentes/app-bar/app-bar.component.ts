import { environment } from '@env/environment';
import { Component, inject, OnInit } from '@angular/core';
import { IonMenu, IonHeader, IonApp, IonToolbar, IonTitle, IonButtons, IonContent, IonMenuButton, IonButton, IonIcon, IonAvatar, IonLabel } from "@ionic/angular/standalone";
import { AvatarButtonComponent } from "../avatar-button/avatar-button.component";
import { Router } from '@angular/router';


@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss'],
  imports: [IonLabel, IonIcon, IonButton, IonHeader, IonToolbar, IonButtons, AvatarButtonComponent],
})
export class AppBarComponent {

  environment = environment

  router = inject(Router)

}
