import { Component, OnInit } from '@angular/core';
import { IonApp, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons, IonRouterOutlet } from "@ionic/angular/standalone";

@Component({
  selector: 'app-frame-component',
  templateUrl: './app-frame.component.html',
  styleUrls: ['./app-frame.component.scss'],
  imports: [IonApp, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons, IonRouterOutlet],
})
export class AppFrameComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
