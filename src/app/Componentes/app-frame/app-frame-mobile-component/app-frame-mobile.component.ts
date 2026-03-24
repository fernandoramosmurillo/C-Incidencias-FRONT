import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonMenu, IonRouterOutlet, IonText } from "@ionic/angular/standalone";

@Component({
  selector: 'app-frame-mobile-component',
  templateUrl: './app-frame-mobile.component.html',
  styleUrls: ['./app-frame-mobile.component.scss'],
  imports: [IonText, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonMenu, IonRouterOutlet],
})
export class AppFrameMobileComponent  implements OnInit {

  env = environment

  ngOnInit() {}

}
