import { Component, Input, OnInit } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/angular/standalone";
import { Incidencia } from 'src/app/Interfaces/incidencia';

@Component({
  selector: 'incidencia-card',
  templateUrl: './incidencia-card.component.html',
  styleUrls: ['./incidencia-card.component.scss'],
  imports: [IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard],
})
export class IncidenciaCardComponent {

  @Input() incidencia!: Incidencia;

}
