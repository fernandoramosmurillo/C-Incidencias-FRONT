import { Component, OnInit } from '@angular/core';
import { IonContent, IonCardHeader, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonLabel, IonItem, IonInput, IonSelect, IonSelectOption, IonButton, IonIcon, IonTextarea, IonList } from "@ionic/angular/standalone";
import { ReportFormComponent } from "src/app/Componentes/report-form/report-form.component";

@Component({
  selector: 'report.page',
  templateUrl: './report.page.component.html',
  imports: [IonList, IonTextarea, IonIcon, IonButton, IonInput, IonItem, IonLabel, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonCardHeader, IonCard, IonSelect, IonSelectOption, ReportFormComponent],
  styleUrls: ['./report.page.component.scss'],
})
export class ReportPageComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
