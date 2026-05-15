import { Incidencia } from 'src/app/Interfaces/incidencia';
import { IncidenciaService } from 'src/app/Services/incidenciaService';
import { Component, Input, OnInit, inject, input, signal } from '@angular/core';

@Component({
  selector: 'incidencia-pagina',
  templateUrl: './incidencia-pagina.component.html',
  styleUrls: ['./incidencia-pagina.component.scss'],
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
