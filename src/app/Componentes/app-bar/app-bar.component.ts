import { environment } from '@env/environment';
import { Component, OnInit } from '@angular/core';
import { IonMenu, IonHeader, IonApp, IonToolbar, IonTitle, IonButtons, IonContent, IonMenuButton, IonButton, IonIcon, IonAvatar } from "@ionic/angular/standalone";


@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss'],
  imports: [IonAvatar, IonIcon, IonButton, IonHeader, IonToolbar, IonButtons],
})
export class AppBarComponent  implements OnInit {

  environment = environment

  ngOnInit() {}

}
