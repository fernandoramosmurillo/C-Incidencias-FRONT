import {
  Component,
  EventEmitter,
  Output,
  signal,
  computed,
} from '@angular/core';
import { Camera, CameraDirection, CameraResultType } from '@capacitor/camera';
import { IonButton, IonImg, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cameraOutline, imagesOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
  imports: [IonIcon, IonButton, IonImg],
})
export class ImagePickerComponent {
  // Inicializamos un signal con un array vacío
  @Output() fotosEnviar = new EventEmitter<string[]>();
  fotos = signal<string[]>([]);

  constructor() {
    // Registramos los iconos que se van a usar en el HTML
    addIcons({ cameraOutline, trashOutline, imagesOutline });
  }

  async takePhoto() {
    try {
      const result = await Camera.takePhoto({
        quality: 70,
        width: 1024,
        includeMetadata: true,
        direction: CameraDirection.Rear,
        promptLabelHeader: 'Muestranos el problema',
        correctOrientation: true, // ¡Fundamental para que no salgan tumbadas!
        promptLabelPhoto: 'Elegir de mis fotos',
        promptLabelPicture: 'Hacer foto al problema ahora',
        allowEditing: false,
        source: 'PROMPT',
        //webUseInput: true
      } as any);

      if (result) {
        const dataUrl = `data:image/${result.metadata!.format};base64,${result.thumbnail}`;

        this.fotos.update((actuales) => [...actuales, dataUrl]);
        this.sendAllPhotos();
      }
    } catch (e: any) {
      if (e.message !== 'User cancelled photos app') {
        console.error('Error al tomar la foto:', e.message);
      }
    }
  }

  removePhoto(index: number) {
    this.fotos.update((actuales) => actuales.filter((_, i) => i !== index));
  }

  sendAllPhotos() {
    this.fotosEnviar.emit(this.fotos());
  }
}
