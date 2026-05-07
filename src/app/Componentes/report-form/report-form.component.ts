import { Component, OnInit } from '@angular/core';
import { IonList, IonItem, IonInput, IonButton, IonLabel, IonIcon, IonText, IonTextarea, IonSelect, IonSelectOption } from "@ionic/angular/standalone";

@Component({
  selector: 'report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
  imports: [IonTextarea, IonText, IonIcon, IonLabel, IonInput, IonItem, IonButton, IonList, IonSelect, IonSelectOption],
})
export class ReportFormComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
