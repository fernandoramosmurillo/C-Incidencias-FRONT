import { environment } from '@env/environment';
import { Component, OnInit } from '@angular/core';
import { IonMenu, IonHeader, IonApp, IonToolbar, IonTitle, IonButtons, IonContent, IonMenuButton, IonButton, IonIcon, IonAvatar, IonLabel } from "@ionic/angular/standalone";
import { AvatarButtonComponent } from "../avatar-button/avatar-button.component";


@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss'],
  imports: [IonLabel, IonAvatar, IonIcon, IonButton, IonHeader, IonToolbar, IonButtons, AvatarButtonComponent],
})
export class AppBarComponent  implements OnInit {

  environment = environment

  ngOnInit() {}

}
