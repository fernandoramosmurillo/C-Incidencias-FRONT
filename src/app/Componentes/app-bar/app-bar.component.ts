import { Component, OnInit } from '@angular/core';
import { IonMenu, IonHeader, IonApp, IonToolbar, IonTitle, IonButtons, IonContent, IonMenuButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss'],
  imports: [IonHeader],
})
export class AppBarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
