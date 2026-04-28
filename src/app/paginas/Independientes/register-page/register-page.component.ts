import { Component, OnInit } from '@angular/core';
import { IonCol, IonRow, IonGrid, IonContent, IonRouterOutlet } from "@ionic/angular/standalone";
import { LoginCardComponent } from "src/app/Componentes/login-card/login-card.component";

@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  imports: [IonRouterOutlet, IonContent, IonRow, IonGrid, IonCol, LoginCardComponent],
})
export class RegisterPageComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
