import { Component, OnInit } from '@angular/core';
import { IonFooter, IonToolbar, IonButton, IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [IonFooter, IonToolbar, IonIcon, IonButton],
})
export class FooterComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
