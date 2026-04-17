import { Component, inject, OnInit } from '@angular/core';
import { IncidenciaService } from 'src/app/Services/incidenciaService';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
} from '@ionic/angular/standalone';

@Component({
  selector: 'incidencia-list-card',
  templateUrl: './incidencia-list-card.component.html',
  imports: [
    IonRow,
    IonGrid,
    IonCol,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonCard,
    IonCard,
  ],
  styleUrls: ['./incidencia-list-card.component.scss'],
})
export class IncidenciaListCardComponent {
  incidenciaService: IncidenciaService = inject(IncidenciaService);

  ngOnInit() {
    this.incidenciaService.cargarDatos();
  }

  ngOnDestroy() {
    this.incidenciaService.cerrarSuscripcion();
  }
}
