import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonMenu, IonRouterOutlet } from "@ionic/angular/standalone";

@Component({
  selector: 'app-frame-mobile-component',
  templateUrl: './app-frame-mobile.component.html',
  styleUrls: ['./app-frame-mobile.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonMenu, IonRouterOutlet],
})
export class AppFrameMobileComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
