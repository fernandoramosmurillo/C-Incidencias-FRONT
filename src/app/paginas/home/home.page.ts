import { IncidenciaService } from './../../Services/incidenciaService';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonCol, IonGrid, IonRow, IonText, IonCardContent, IonCardHeader, IonCard, IonCardTitle, IonCardSubtitle, IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonImg, IonRow, IonGrid, IonCol, IonContent, CommonModule, FormsModule]
})
export class HomePage {

  incidenciaService: IncidenciaService = inject(IncidenciaService);

  ionViewWillEnter() {
    this.incidenciaService.cargarDatos();
  }

  ionViewWillLeave() {
    this.incidenciaService.cerrarSuscripcion();
  }
}
