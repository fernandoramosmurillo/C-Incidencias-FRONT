import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonMenu, IonRouterOutlet, IonText, IonButton } from "@ionic/angular/standalone";
import { AvatarButtonComponent } from "../../avatar-button/avatar-button.component";

@Component({
  selector: 'app-frame-mobile-component',
  templateUrl: './app-frame-mobile.component.html',
  styleUrls: ['./app-frame-mobile.component.scss'],
  imports: [IonButton, IonText, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonMenu, IonRouterOutlet, AvatarButtonComponent],
})
export class AppFrameMobileComponent  implements OnInit {

  env = environment

  ngOnInit() {}

}
