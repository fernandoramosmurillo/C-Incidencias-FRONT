import {
  Component,
  EventEmitter,
  Output,
  signal,
  inject, // Inyectamos inject para el servicio de alertas
} from '@angular/core';

import { Camera, CameraDirection } from '@capacitor/camera';
import { IonButton, IonImg, IonIcon } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular'; // Importamos el controlador de alertas nativas de Ionic

import { addIcons } from 'ionicons';
import { cameraOutline, imagesOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
  imports: [IonIcon, IonButton, IonImg],
})
export class ImagePickerComponent {

  @Output() fotosEnviar = new EventEmitter<string[]>();

  fotos = signal<string[]>([]);

  // Máximo de fotos permitidas
  maxFotos = 3;

  // Servicios de Ionic
  private alertController = inject(AlertController);

  constructor() {
    addIcons({
      cameraOutline,
      trashOutline,
      imagesOutline,
    });
  }

  // Función para mostrar alertas
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['Entendido'],
    });
    await alert.present();
  }

  async takePhoto() {

    // Si llega al límite, avisa al usuario con una alerta
    if (this.fotos().length >= this.maxFotos) {
      this.mostrarAlerta('Límite alcanzado', `Solo puedes adjuntar un máximo de ${this.maxFotos} imágenes.`);
      return;
    }

    try {
      const result = await Camera.takePhoto({
        quality: 70,
        width: 720,
        includeMetadata: true,
        direction: CameraDirection.Rear,
        promptLabelHeader: 'Muestranos el problema',
        correctOrientation: true,
        promptLabelPhoto: 'Elegir de mis fotos',
        promptLabelPicture: 'Hacer foto al problema ahora',
        allowEditing: false,
        source: 'PROMPT',
      } as any);

      if (result) {
        const formato = result.metadata!.format?.toLowerCase();

        // 1. FILTRO DE FORMATO: Bloqueamos los GIFs de raíz
        if (formato === 'gif') {
          this.mostrarAlerta('Formato no permitido', 'No se admiten imágenes en formato GIF animados por motivos de rendimiento.');
          return;
        }

        // 2. FILTRO DE TAMAÑO: Comprobamos la longitud del string en base64 (2.5M de caracteres ≈ 2.5MB)
        const pesoEstimado = result.thumbnail?.length || 0;
        if (pesoEstimado > 2500000) {
          this.mostrarAlerta('Imagen demasiado pesada', 'La imagen seleccionada supera el tamaño máximo permitido. Intenta con otra foto.');
          return;
        }

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
    this.fotos.update((actuales) =>
      actuales.filter((_, i) => i !== index)
    );
    this.sendAllPhotos(); // Enviamos la lista actualizada al padre tras borrar
  }

  sendAllPhotos() {
    this.fotosEnviar.emit(this.fotos());
  }
}
