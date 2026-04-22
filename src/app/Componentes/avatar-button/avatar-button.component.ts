import { Component, OnInit } from '@angular/core';
import { IonButton, IonAvatar } from "@ionic/angular/standalone";

@Component({
  selector: 'avatar-button',
  templateUrl: './avatar-button.component.html',
  imports: [IonAvatar, IonButton],
  styleUrls: ['./avatar-button.component.scss'],
})
export class AvatarButtonComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
