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

  // Función auxiliar para limpiar y blindar todas las referencias antes de enviarlas al Back
  private formatearPayloadSeguro(incidencia: Incidencia): any {
    const idCiudadano = incidencia.usuarioCiudadano?.idUsuario || incidencia.usuarioCiudadano;
    
    const idsOperarios = Array.isArray(incidencia.listaOperarios)
      ? incidencia.listaOperarios.map((op: any) => op?.idUsuario || op)
      : [];

    return {
      ...incidencia,
      usuarioCiudadano: idCiudadano ? `usuarios/${idCiudadano}` : null,
      listaOperarios: idsOperarios.map(id => `usuarios/${id}`)
    };
  }

  async cambiarEstado(id: string, nuevoEstado: EstadosIncidencia) {
    if (this.esCiudadano()) return;

    const incidenciaOriginal = this.incidencias().find(inc => inc.idIncidencia === id);
    if (!incidenciaOriginal) return;

    try {
      const datosActualizados = { ...incidenciaOriginal, estadoIncidencia: nuevoEstado };
      const bodySeguro = this.formatearPayloadSeguro(datosActualizados);

      await this.httpService.modificarDato('incidencias', id, bodySeguro);

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

    try {
      const datosActualizados = { ...incidenciaOriginal, prioridad: nuevaPrioridad };
      const bodySeguro = this.formatearPayloadSeguro(datosActualizados);

      await this.httpService.modificarDato('incidencias', id, bodySeguro);

      this.incidenciaService.datos.update(lista =>
        lista.map(inc => inc.idIncidencia === id ? { ...inc, prioridad: nuevaPrioridad } : inc)
      );
    } catch (error) {
      console.error(error);
    }
  }

  async rechazar(id: string) {
    if (this.esCiudadano()) return;

    const incidenciaOriginal = this.incidencias().find(inc => inc.idIncidencia === id);
    if (!incidenciaOriginal) return;

    if (confirm('¿Proceder con el rechazo de la incidencia?')) {
      try {
        const datosActualizados = { ...incidenciaOriginal, estadoIncidencia: EstadosIncidencia.RECHAZADA };
        const bodySeguro = this.formatearPayloadSeguro(datosActualizados);

        await this.httpService.modificarDato('incidencias', id, bodySeguro);

        this.incidenciaService.datos.update(lista =>
          lista.map(inc => inc.idIncidencia === id ? { ...inc, estadoIncidencia: EstadosIncidencia.RECHAZADA } : inc)
        );
      } catch (error) {
        console.error(error);
      }
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