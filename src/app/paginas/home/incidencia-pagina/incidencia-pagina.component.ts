import { Incidencia } from 'src/app/Interfaces/incidencia';
import { IncidenciaService } from 'src/app/Services/incidenciaService';
import { Component, Input, OnInit, inject, input, signal } from '@angular/core';
import { IonContent, IonGrid, IonRow, IonCol, IonCardHeader, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/angular/standalone";

@Component({
  selector: 'incidencia-pagina',
  templateUrl: './incidencia-pagina.component.html',
  styleUrls: ['./incidencia-pagina.component.scss'],
  imports: [IonCardContent, IonCardSubtitle, IonCardTitle, IonCard, IonCardHeader, IonCol, IonRow, IonContent, IonGrid],
})
export class IncidenciaPaginaComponent implements OnInit {
  incidencia = signal<Incidencia | undefined>(undefined);

  ngOnInit(): void {
    this.incidencia.set(
      this.incidenciaService
        .datos()
        .find((incidencia) => incidencia.idIncidencia == this.idIncidencia),
    );
  }

  @Input() idIncidencia!: string;
  incidenciaService = inject(IncidenciaService);

}
