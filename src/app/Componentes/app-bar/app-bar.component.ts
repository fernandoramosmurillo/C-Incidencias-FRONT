import { environment } from '@env/environment';
import { Component, OnInit } from '@angular/core';
import { IonMenu, IonHeader, IonApp, IonToolbar, IonTitle, IonButtons, IonContent, IonMenuButton, IonButton } from "@ionic/angular/standalone";


@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss'],
  imports: [IonButton, IonHeader],
})
export class AppBarComponent  implements OnInit {

  environment = environment

  ngOnInit() {}

}
