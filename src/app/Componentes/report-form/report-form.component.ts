import { AfterViewInit, Component, inject, OnInit, ɵɵNgOnChangesFeature } from '@angular/core';
import {
  IonList,
  IonItem,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonButton,
  IonNote,
} from '@ionic/angular/standalone';
import { MapService } from 'src/app/Services/map-service';
import { ImagePickerComponent } from '../image-picker.component/image-picker.component';
import { HttpService } from 'src/app/Services/http-service';
import { environment } from '@env/environment';
import { LocalStorageService } from 'src/app/Services/local-storage-service';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Ciudadano } from 'src/app/Interfaces/ciudadano';
import {
  EstadosIncidencia,
  Incidencia,
  Prioridades,
} from 'src/app/Interfaces/incidencia';
import { Timestamp, GeoPoint } from 'firebase/firestore'; // Los tipos de datos se quedan igual
import { Firestore, collection, doc } from '@angular/fire/firestore'; // La funcionalidad de Angular
import { FullUsuario } from 'src/app/Interfaces/fullUsuario';

@Component({
  selector: 'report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonNote,
    IonButton,
    IonCardTitle,
    IonCardContent,
    IonCardHeader,
    IonCard,
    IonTextarea,
    IonInput,
    IonItem,
    IonList,
    IonSelect,
    IonSelectOption,
    IonLabel,
    ImagePickerComponent,
  ],
})
export class ReportFormComponent implements AfterViewInit, OnInit {
  public env = environment;
  private httpService = inject(HttpService);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);
  private firestore = inject(Firestore);

  fullUser!: FullUsuario
  usuario!: Ciudadano
  fotosTomadas!: string[]

  ngOnInit() {
    this.fullUser = this.localStorageService.obtenerDeLocal('usuario') || {};
    this.usuario = this.fullUser?.datosUsuario as Ciudadano;
    this.fotosTomadas = [];
  }

  incidenciaForm = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [
      Validators.required,
      Validators.maxLength(600),
    ]),
    categoria: new FormControl<string[]>([], [Validators.required]),
  });

  async onSubmit() {
    if (this.incidenciaForm.invalid) return;

    const nuevoId = doc(collection(this.firestore, 'incidencias')).id;

    const incidenciaEnviar: Incidencia = {
      titulo: this.incidenciaForm.get('titulo')!.value!,
      descripcion: this.incidenciaForm.get('descripcion')!.value!,
      categorias: this.incidenciaForm.get('categoria')?.value as string[],
      comentarios: [],
      imagenesUrl: this.fotosTomadas,
      fechaCreacion: Timestamp.now(),
      usuarioCiudadano: this.usuario,
      prioridad: Prioridades.MEDIA,
      estadoIncidencia: EstadosIncidencia.ABIERTA,
      idIncidencia: nuevoId,

      ubicacion: this.mapService.devolverCordenadas(),
      listaOperarios: [],
    };

    try {
      if (!this.fullUser) {
        alert(
          'UPPS! esto no debe pasar, vuelve a iniciar sesion y intentalo de nuevo',
        );
        return;
      }

      const res = await this.httpService.añadirDato(
        'incidencias',
        incidenciaEnviar,
      );

      if (res) {

        // Limpia el formulario
        this.incidenciaForm.reset();
        this.fotosTomadas = []; // limpia las fotos

        console.log(incidenciaEnviar);
        alert('Se ha añadido una nueva incidencia');

        if (!this.usuario.incidenciasSolicitadas) {
          this.usuario.incidenciasSolicitadas = [];
        }
        this.usuario.incidenciasSolicitadas.push(incidenciaEnviar as any);

        this.fullUser.datosUsuario = this.usuario;
        this.localStorageService.guardarEnLocal('usuario', this.fullUser);

        this.router.navigate(['/inicio']);
      }
    } catch (error: any) {
      alert('Error al enviar la incidencia');
    }
  }

  obtenerMensajeError(nombreControl: string): string {
    const control = this.incidenciaForm.get(nombreControl);
    if (control?.touched && control?.errors) {
      if (control.hasError('required')) return 'Obligatorio';
      if (control.hasError('maxlength')) return 'Máximo 600 caracteres';
    }
    return '';
  }

  mapService = inject(MapService);

  ngAfterViewInit() {
    console.log('Iniciando mapa...');
    this.mapService.crearMapa('map');
  }

  recibirFotos(fotos: string[]) {
    this.fotosTomadas = fotos;
  }
}
