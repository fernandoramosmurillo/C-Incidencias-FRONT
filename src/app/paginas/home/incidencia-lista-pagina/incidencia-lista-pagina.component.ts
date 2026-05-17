import { Component, OnInit } from '@angular/core';
import { IonCardSubtitle, IonCardTitle, IonContent, IonGrid, IonCol, IonRow, IonCard, IonCardHeader, IonCardContent } from "@ionic/angular/standalone";
import { IncidenciaListaGestionComponent } from "src/app/Componentes/incidencia-lista-gestion/incidencia-lista-gestion.component";

@Component({
  selector: 'incidencia-lista',
  templateUrl: './incidencia-lista-pagina.component.html',
  styleUrls: ['./incidencia-lista-pagina.component.scss'],
  imports: [IonCardContent, IonCardHeader, IonCard, IonRow, IonCol, IonGrid, IonContent, IonCardTitle, IonCardSubtitle, IncidenciaListaGestionComponent],
})
export class IncidenciaListaComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
