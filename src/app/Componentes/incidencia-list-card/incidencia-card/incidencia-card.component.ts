import { Component, input, Input, OnInit, signal } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonIcon, IonAvatar, IonItem, IonLabel } from "@ionic/angular/standalone";
import { Incidencia } from 'src/app/Interfaces/incidencia';
import { AvatarButtonComponent } from "../../avatar-button/avatar-button.component";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'incidencia-card',
  templateUrl: './incidencia-card.component.html',
  styleUrls: ['./incidencia-card.component.scss'],
  imports: [IonLabel, IonItem, IonIcon, IonImg, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonAvatar, AvatarButtonComponent,DatePipe],
})
export class IncidenciaCardComponent {

  incidencia = input.required<Incidencia>();
  fotoCargada = signal(true);

}
