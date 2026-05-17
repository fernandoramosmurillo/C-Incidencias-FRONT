import { Component, inject, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IncidenciaService } from 'src/app/Services/incidenciaService';
import { HttpService } from './../../Services/http-service';
import { EstadosIncidencia, Prioridades, Incidencia } from 'src/app/Interfaces/incidencia';
import { IonHeader, IonCol, IonBadge, IonButton, IonToolbar, IonSelectOption, IonSelect, IonGrid, IonContent, IonRow, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-incidencia-lista-gestion',
  standalone: true,
  templateUrl: './incidencia-lista-gestion.component.html',
  styleUrls: ['./incidencia-lista-gestion.component.scss'],
  imports: [IonTitle, IonRow, IonContent, IonGrid, IonToolbar, IonButton, IonBadge, IonCol, IonHeader, CommonModule, DatePipe, IonSelectOption, IonSelect]
})
export class IncidenciaListaGestionComponent {
  incidenciaService = inject(IncidenciaService);
  httpService = inject(HttpService);

  incidencias = computed(() => this.incidenciaService.datos());

  Estados = EstadosIncidencia;
  Prioridades = Prioridades;

  async cambiarEstado(id: string, nuevoEstado: EstadosIncidencia) {
    await this.httpService.cambiarEstado('incidencias', id, nuevoEstado);
    this.incidenciaService.datos.update(lista =>
      lista.map(inc => inc.idIncidencia === id ? { ...inc, estadoIncidencia: nuevoEstado } : inc)
    );
    this.incidenciaService.asignarModelos();
  }

  async cambiarPrioridad(id: string, nuevaPrioridad: Prioridades) {
    const incidencia = this.incidencias().find(inc => inc.idIncidencia === id) as Incidencia;
    await this.httpService.modificarDato('incidencias', id, { ...incidencia, prioridad: nuevaPrioridad });
    this.incidenciaService.datos.update(lista =>
      lista.map(inc => inc.idIncidencia === id ? { ...inc, prioridad: nuevaPrioridad } : inc)
    );
    this.incidenciaService.asignarModelos();
  }

  async rechazar(id: string) {
    if (confirm('¿Proceder con el rechazo de la incidencia?')) {
      await this.httpService.cambiarEstado('incidencias', id, EstadosIncidencia.RECHAZADA);
      this.incidenciaService.datos.update(lista =>
        lista.map(inc => inc.idIncidencia === id ? { ...inc, estadoIncidencia: EstadosIncidencia.RECHAZADA } : inc)
      );
      this.incidenciaService.asignarModelos();
    }
  }

  getBadgeColor(estado: EstadosIncidencia): string {
    const colores: Record<EstadosIncidencia, string> = {
      [EstadosIncidencia.ABIERTA]: 'warning',
      [EstadosIncidencia.PENDIENTE]: 'medium',
      [EstadosIncidencia.ASIGNADA]: 'secondary',
      [EstadosIncidencia.SOLUCIONADA]: 'success',
      [EstadosIncidencia.RECHAZADA]: 'danger'
    };
    return colores[estado] || 'medium';
  }

  getPrioridadColor(prioridad: Prioridades): string {
    const colores: Record<Prioridades, string> = {
      [Prioridades.MINIMO]: 'light',
      [Prioridades.BAJA]: 'medium',
      [Prioridades.MEDIA]: 'primary',
      [Prioridades.ALTA]: 'warning',
      [Prioridades.MUY_ALTA]: 'danger',
      [Prioridades.URGENTE]: 'danger'
    };
    return colores[prioridad] || 'medium';
  }
}
