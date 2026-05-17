import { Component, inject, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IncidenciaService } from 'src/app/Services/incidenciaService';
import { HttpService } from './../../Services/http-service';
import { LocalStorageService } from './../../Services/local-storage-service';
import { EstadosIncidencia, Prioridades, Incidencia } from 'src/app/Interfaces/incidencia';
import { IonHeader, IonCol, IonBadge, IonButton, IonToolbar, IonSelectOption, IonSelect, IonGrid, IonContent, IonRow, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'incidencia-lista-gestion',
  standalone: true,
  templateUrl: './incidencia-lista-gestion.component.html',
  styleUrls: ['./incidencia-lista-gestion.component.scss'],
  imports: [IonTitle, IonRow, IonContent, IonGrid, IonToolbar, IonButton, IonBadge, IonCol, IonHeader, CommonModule, DatePipe, IonSelectOption, IonSelect]
})
export class IncidenciaListaGestionComponent {
  incidenciaService = inject(IncidenciaService);
  httpService = inject(HttpService);
  localStorageService = inject(LocalStorageService);

  incidencias = computed(() => this.incidenciaService.datos());

  usuarioLogueado = computed(() => this.localStorageService.obtenerDeLocal('usuario'));
  esCiudadano = computed(() => this.usuarioLogueado()?.rol === 'ciudadano');

  Estados = EstadosIncidencia;
  Prioridades = Prioridades;

  async cambiarEstado(id: string, nuevoEstado: EstadosIncidencia) {
    if (this.esCiudadano()) return;

    const incidenciaOriginal = this.incidencias().find(inc => inc.idIncidencia === id);
    if (!incidenciaOriginal) return;

    const idCiudadanoLimpio = incidenciaOriginal.usuarioCiudadano?.idUsuario || incidenciaOriginal.usuarioCiudadano;

    try {
      // Usamos modificarDato enviando el objeto estructurado igual que en las prioridades
      await this.httpService.modificarDato('incidencias', id, {
        ...incidenciaOriginal,
        estadoIncidencia: nuevoEstado,
        usuarioCiudadano: `usuarios/${idCiudadanoLimpio}`
      });

      this.incidenciaService.datos.update(lista =>
        lista.map(inc => inc.idIncidencia === id ? { ...inc, estadoIncidencia: nuevoEstado } : inc)
      );
    } catch (error) {
      console.error(error);
    }
  }

  async cambiarPrioridad(id: string, nuevaPrioridad: Prioridades) {
    if (this.esCiudadano()) return;

    const incidenciaOriginal = this.incidencias().find(inc => inc.idIncidencia === id);
    if (!incidenciaOriginal) return;

    const idCiudadanoLimpio = incidenciaOriginal.usuarioCiudadano?.idUsuario || incidenciaOriginal.usuarioCiudadano;

    try {
      await this.httpService.modificarDato('incidencias', id, {
        ...incidenciaOriginal,
        prioridad: nuevaPrioridad,
        usuarioCiudadano: `usuarios/${idCiudadanoLimpio}`
      });

      this.incidenciaService.datos.update(lista =>
        lista.map(inc => inc.idIncidencia === id ? { ...inc, prioridad: nuevaPrioridad } : inc)
      );
    } catch (error) {
      console.error(error);
    }
  }

  async rechazar(id: string) {
    if (this.esCiudadano()) return;
    if (confirm('¿Proceder con el rechazo de la incidencia?')) {
      await this.httpService.cambiarEstado('incidencias', id, EstadosIncidencia.RECHAZADA);
      this.incidenciaService.datos.update(lista =>
        lista.map(inc => inc.idIncidencia === id ? { ...inc, estadoIncidencia: EstadosIncidencia.RECHAZADA } : inc)
      );
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
