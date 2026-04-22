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
import { UsuarioService } from 'src/app/Services/usuarioService';
import { IncidenciaCardComponent } from "./incidencia-card/incidencia-card.component";

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
    IncidenciaCardComponent
],
  styleUrls: ['./incidencia-list-card.component.scss'],
})
export class IncidenciaListCardComponent implements OnInit {
  incidenciaService: IncidenciaService = inject(IncidenciaService);
  usuarioService: UsuarioService = inject(UsuarioService);

  async ngOnInit() {
    await Promise.all([
      this.incidenciaService.cargarDatos(),
      this.usuarioService.cargarDatos(),
    ]);
    this.incidenciaService.asignarModelos();
  }
}
