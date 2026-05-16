import { Component, inject, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonMenu, IonRouterOutlet, IonText, IonButton, IonList, IonItem, IonIcon, IonLabel } from "@ionic/angular/standalone";
import { AvatarButtonComponent } from "../../avatar-button/avatar-button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-frame-mobile-component',
  templateUrl: './app-frame-mobile.component.html',
  styleUrls: ['./app-frame-mobile.component.scss'],
  imports: [IonLabel, IonIcon, IonItem, IonList, IonButton, IonText, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonMenu, IonRouterOutlet, AvatarButtonComponent],
})
export class AppFrameMobileComponent  implements OnInit {

  env = environment

  router = inject(Router)

  ngOnInit() {}

}
