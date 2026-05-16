import { Component, inject, OnInit, input, computed } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { IonAvatar, IonIcon, IonTextarea, IonButton, IonCheckbox } from '@ionic/angular/standalone';
import { HttpService } from 'src/app/Services/http-service';
import { LocalStorageService } from 'src/app/Services/local-storage-service';
import { FullUsuario } from 'src/app/Interfaces/fullUsuario';
import { Ciudadano } from 'src/app/Interfaces/ciudadano';
import { Timestamp } from 'firebase/firestore';
import { Firestore, collection, doc } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { ComentarioService } from 'src/app/Services/comentarioServicio';

@Component({
  selector: 'comentary-zone',
  templateUrl: './comentary-zone.component.html',
  styleUrls: ['./comentary-zone.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, IonAvatar, IonIcon, IonTextarea, IonButton, IonCheckbox],
})
export class ComentaryZoneComponent implements OnInit {
  private httpService = inject(HttpService);
  private localStorageService = inject(LocalStorageService);
  private comentarioService = inject(ComentarioService);
  private firestore = inject(Firestore);

  incidencia = input<any>(null);
  fullUser!: FullUsuario;
  usuario!: Ciudadano;

  comentariosPublicos = computed(() => {
    const datos = this.incidencia();
    return this.comentarioService.filtrarPublicos(datos?.comentarios);
  });

  comentarioForm = new FormGroup({
    texto: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    esPrivado: new FormControl<boolean>(false),
  });

  ngOnInit() {
    this.localStorageService.comprobarSesion();
    this.fullUser = this.localStorageService.obtenerDeLocal('usuario') || {};
    this.usuario = this.fullUser?.datosUsuario as Ciudadano;
  }

  private extraerId(referencia: any): string {
    if (!referencia) return '';
    if (typeof referencia !== 'string') {
      return referencia?.idComentario || referencia?.id || '';
    }
    return referencia.split('/').pop() || '';
  }

  async enviarComentario() {
    if (this.comentarioForm.invalid) return;
    if (!this.fullUser || !this.usuario) return;

    const datosIncidencia = this.incidencia();
    if (!datosIncidencia) return;

    const nuevoIdComentario = doc(collection(this.firestore, 'comentarios')).id;
    const comentarioEnviar: any = {
      idComentario: nuevoIdComentario,
      texto: this.comentarioForm.get('texto')!.value!.trim(),
      fechaPublicacion: Timestamp.now().toDate().toISOString(),
      esPrivado: this.comentarioForm.get('esPrivado')?.value === true,
      usuarioAutor: `usuarios/${this.usuario.idUsuario}`,
    };

    try {
      const resComentario = await this.httpService.añadirDato('comentarios', comentarioEnviar);

      if (resComentario) {
        if (!datosIncidencia.comentarios) datosIncidencia.comentarios = [];

        datosIncidencia.comentarios.push({
          ...comentarioEnviar,
          usuarioAutor: this.usuario,
          fechaPublicacion: Timestamp.now(),
        });

        const referenciasComentarios = datosIncidencia.comentarios
          .map((c: any) => {
            const idLimpio = this.extraerId(c);
            return idLimpio ? `comentarios/${idLimpio}` : null;
          })
          .filter((ref: string | null): ref is string => !!ref);

        const idCiudadanoLimpio = datosIncidencia.usuarioCiudadano?.idUsuario || datosIncidencia.usuarioCiudadano;

        await this.httpService.modificarDato('incidencias', datosIncidencia.idIncidencia, {
          ...datosIncidencia,
          usuarioCiudadano: `usuarios/${idCiudadanoLimpio}`,
          comentarios: referenciasComentarios,
        });

        datosIncidencia.comentarios = [...datosIncidencia.comentarios];
        this.comentarioForm.reset({ texto: '', esPrivado: false });
      }
    } catch (error) {
      alert('Error al publicar el comentario');
    }
  }
}
