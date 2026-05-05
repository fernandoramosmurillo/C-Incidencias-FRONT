import { Component, computed, effect, inject, OnInit, signal, Signal } from '@angular/core';
import { IonHeader, IonContent, IonRouterOutlet, IonImg, IonFooter } from "@ionic/angular/standalone";
import { AppBarComponent } from "../../app-bar/app-bar.component";
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-frame-desktop-component',
  templateUrl: './app-frame-desktop-component.component.html',
  styleUrls: ['./app-frame-desktop-component.component.scss'],
  imports: [IonFooter, IonHeader, IonContent, IonRouterOutlet, AppBarComponent, FooterComponent],
})
export class AppFrameDesktopComponentComponent {
}
