import { IonIcon } from '@ionic/angular/standalone';
import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader, IonContent, Platform } from '@ionic/angular/standalone';
import { AppBarComponent } from "./Componentes/app-bar/app-bar.component";
import { AppFrameComponent } from "./Componentes/app-frame/app-frame.component";
import { addIcons } from 'ionicons';
import { create, home} from 'ionicons/icons'
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonContent, IonHeader, IonApp, IonRouterOutlet, AppBarComponent, AppFrameComponent, IonIcon, RouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      home,
      create
    });
  }
}
