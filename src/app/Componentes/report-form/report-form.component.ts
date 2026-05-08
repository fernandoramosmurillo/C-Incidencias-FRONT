import { Component, inject, OnInit } from '@angular/core';
import { IonList, IonItem, IonInput, IonTextarea, IonSelect, IonSelectOption, IonLabel, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonButton, IonNote } from "@ionic/angular/standalone";
import { MapService } from 'src/app/Services/map-service';
import { ImagePickerComponent } from "../image-picker.component/image-picker.component";

@Component({
  selector: 'report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
  imports: [IonNote, IonButton, IonCardTitle, IonCardContent, IonCardHeader, IonCard, IonTextarea, IonInput, IonItem, IonList, IonSelect, IonSelectOption, IonLabel, ImagePickerComponent],
})
export class ReportFormComponent {

  mapService = inject(MapService);

  ngAfterViewInit() {
    console.log("Iniciando mapa...");
    this.mapService.crearMapa('map');
  }
}
