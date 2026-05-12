import { Categorias } from './../../Interfaces/incidencia';
import { AfterViewInit, Component, inject, OnInit, ɵɵNgOnChangesFeature, signal } from '@angular/core';
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
import { Timestamp, GeoPoint, DocumentReference } from 'firebase/firestore'; // Los tipos de datos se quedan igual
import { Firestore, collection, doc } from '@angular/fire/firestore'; // La funcionalidad de Angular
import { FullUsuario } from 'src/app/Interfaces/fullUsuario';

@Component({
  selector: 'report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonTextarea,
    IonInput,
    IonItem,
    IonList,
    IonSelect,
    IonSelectOption,
    IonLabel,
    IonNote,
    IonCard,
    IonCardHeader,
    IonCardContent,
    ImagePickerComponent,
    IonCardTitle,
    IonButton
],
})
export class ReportFormComponent implements AfterViewInit, OnInit {
  public env = environment;
  private httpService = inject(HttpService);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);
  private firestore = inject(Firestore);

  //Esto no se usa, es solo para recoger las categorias
  public categorias = signal(
    Object.entries(Categorias).map(([key, value]) => ({ key, value }))
  );


  fullUser!: FullUsuario
  usuario!: Ciudadano
  fotosTomadas!: string[]

  ngOnInit() {
    this.fullUser = this.localStorageService.obtenerDeLocal('usuario') || {};
    this.usuario = this.fullUser?.datosUsuario as Ciudadano;
    this.fotosTomadas = [];
    console.log(this.usuario.incidenciasSolicitadas);
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
    if (this.incidenciaForm.invalid || this.fotosTomadas.length === 0) {
      alert('Por favor, completa todos los campos y añade al menos una foto.');
      return;
    }

    const nuevoId = doc(collection(this.firestore, 'incidencias')).id;

    const incidenciaEnviar: any = {
      titulo: this.incidenciaForm.get('titulo')!.value!,
      descripcion: this.incidenciaForm.get('descripcion')!.value!,
      categorias: this.incidenciaForm.get('categoria')?.value as string[],
      comentarios: [],
      imagenesUrl: [],
      fechaCreacion: Timestamp.now().toDate().toISOString(),
      usuarioCiudadano: `usuarios/${this.usuario.idUsuario}`,
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

      incidenciaEnviar.imagenesUrl = this.fotosTomadas;

      const res = await this.httpService.añadirDato(
        'incidencias',incidenciaEnviar
      );

      if (res) {

        // Limpia el formulario
        this.incidenciaForm.reset();
        this.fotosTomadas = []; // limpia las fotos


        console.log(incidenciaEnviar);
        alert('Se ha añadido una nueva incidencia');

        // Guarda la incidencia en el usuario
        if (!this.usuario.incidenciasSolicitadas) {
          this.usuario.incidenciasSolicitadas = [];
        }
        this.usuario.incidenciasSolicitadas.push(`incidencias/${incidenciaEnviar.idIncidencia}` as any);
        this.fullUser.datosUsuario = this.usuario;

        console.log(await this.httpService.modificarDato('usuarios', this.fullUser.datosUsuario.idUsuario, this.fullUser.datosUsuario));
        this.localStorageService.guardarEnLocal('usuario', this.fullUser);

        //Redireccion del usuario
        this.router.navigate(['/app/inicio']);
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
