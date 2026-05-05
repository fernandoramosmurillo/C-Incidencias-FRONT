import { Usuario } from './../../Interfaces/usuario';
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCol, IonGrid, IonRow, IonImg, IonHeader } from '@ionic/angular/standalone';
import { IncidenciaListCardComponent } from 'src/app/Componentes/incidencia-list-card/incidencia-list-card.component';
import { LocalStorageService } from 'src/app/Services/local-storage-service';
import { FullUsuario } from 'src/app/Interfaces/fullUsuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonImg, IonRow, IonGrid, IonCol, IonContent, CommonModule, FormsModule, IncidenciaListCardComponent]
})
export class HomePage {
  localStorageService = inject(LocalStorageService);

  usuario = signal(this.localStorageService.obtenerDeLocal('usuario') as FullUsuario);
}
