import { PantallaObserverService } from './../../Services/pantalla-observer-service';
import { Component, inject } from '@angular/core';
import { IonApp } from "@ionic/angular/standalone";
import { AppFrameMobileComponent } from "./app-frame-mobile-component/app-frame-mobile.component";
import { AppFrameDesktopComponentComponent } from "./app-frame-desktop-component/app-frame-desktop-component.component";

@Component({
  selector: 'app-frame-component',
  templateUrl: './app-frame.component.html',
  styleUrls: ['./app-frame.component.scss'],
  imports: [IonApp, AppFrameMobileComponent, AppFrameDesktopComponentComponent],
})
export class AppFrameComponent {
  observerService = inject(PantallaObserverService)
}
