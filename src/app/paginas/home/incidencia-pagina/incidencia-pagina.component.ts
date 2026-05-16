import { IncidenciaService } from 'src/app/Services/incidenciaService';
import { Component, inject, input, computed, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCardHeader,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonIcon,
  IonBadge,
  IonChip,
  IonText,
  IonList,
  IonAvatar,
} from '@ionic/angular/standalone';
import { DatePipe } from '@angular/common';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'incidencia-pagina',
  templateUrl: './incidencia-pagina.component.html',
  styleUrls: ['./incidencia-pagina.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    DatePipe,
    IonAvatar,
    IonList,
    IonText,
    IonChip,
    IonBadge,
    IonIcon,
    IonLabel,
    IonItem,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCard,
    IonCardHeader,
    IonCol,
    IonRow,
    IonContent,
    IonGrid
],
})
export class IncidenciaPaginaComponent {
  incidenciaService = inject(IncidenciaService);

  idIncidencia = input.required<string>();

  incidencia = computed(() => {
    const id = this.idIncidencia();
    return this.incidenciaService
      .datos()
      .find((inc) => inc.idIncidencia === id);
  });
}
