import { Component, computed, effect, inject, OnInit, signal, Signal } from '@angular/core';
import { IonHeader, IonContent, IonRouterOutlet, IonImg } from "@ionic/angular/standalone";

@Component({
  selector: 'app-frame-desktop-component',
  templateUrl: './app-frame-desktop-component.component.html',
  styleUrls: ['./app-frame-desktop-component.component.scss'],
  imports: [IonHeader, IonContent, IonRouterOutlet],
})
export class AppFrameDesktopComponentComponent {
}
