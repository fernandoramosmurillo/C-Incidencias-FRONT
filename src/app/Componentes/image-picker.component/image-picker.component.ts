import { Component, signal } from '@angular/core';
import { Camera, CameraDirection } from '@capacitor/camera';
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
  fotos = signal<string[]>([]);

  constructor() {
    // Registramos los iconos que se van a usar en el HTML
    addIcons({ cameraOutline, trashOutline, imagesOutline });
  }

  async takePhoto() {
    try {
      const result = await Camera.takePhoto({
        quality: 90,
        width: 1024,
        includeMetadata: true,
        resultType: 'uri',
        direction: CameraDirection.Rear,
        promptLabelHeader: 'Muestranos el problema',
        correctOrientation: true,  // ¡Fundamental para que no salgan tumbadas!
        promptLabelPhoto: 'Elegir de mis fotos',
        promptLabelPicture: 'Hacer foto al problema ahora',
        allowEditing: false,
        source: 'PROMPT',
        //webUseInput: true
      } as any);

      if (result.webPath) {
        // Actualizamos el signal añadiendo la nueva foto al array
        this.fotos.update(actuales => [...actuales, result.webPath!]);
      }

    } catch (e: any) {
      if (e.message !== 'User cancelled photos app') {
        console.error('Error al tomar la foto:', e.message);
      }
    }
  }

  removePhoto(index: number) {
    this.fotos.update(actuales => actuales.filter((_, i) => i !== index));
  }
}
