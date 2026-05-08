import { Component, inject, OnInit } from '@angular/core';
import { IonList, IonItem, IonInput, IonTextarea, IonSelect, IonSelectOption, IonLabel } from "@ionic/angular/standalone";
import { MapService } from 'src/app/Services/map-service';

@Component({
  selector: 'report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
  imports: [IonTextarea, IonInput, IonItem, IonList, IonSelect, IonSelectOption, IonLabel],
})
export class ReportFormComponent {

  mapService = inject(MapService);

  ngAfterViewInit() {
    console.log("Iniciando mapa...");
    this.mapService.crearMapa('map');
  }
}
