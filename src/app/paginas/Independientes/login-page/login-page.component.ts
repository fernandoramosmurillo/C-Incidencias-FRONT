import { Component, OnInit } from '@angular/core';
import { IonCol, IonRow, IonGrid, IonContent, IonRouterOutlet } from "@ionic/angular/standalone";
import { LoginCardComponent } from "src/app/Componentes/login-card/login-card.component";

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  imports: [IonRouterOutlet, IonContent, IonRow, IonGrid, IonCol, LoginCardComponent],
})
export class LoginPageComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
