import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { IonApp } from "@ionic/angular/standalone";
import { AppFrameMobileComponent } from "./app-frame-mobile-component/app-frame-mobile.component";
import { AppFrameDesktopComponentComponent } from "./app-frame-desktop-component/app-frame-desktop-component.component";
import { toSignal } from '@angular/core/rxjs-interop'; // <--- Importa
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';

@Component({
  selector: 'app-frame-component',
  templateUrl: './app-frame.component.html',
  styleUrls: ['./app-frame.component.scss'],
  imports: [IonApp, AppFrameMobileComponent, AppFrameDesktopComponentComponent],
})
export class AppFrameComponent {
  breakpointObserver = inject(BreakpointObserver);

  pantallaEnanaSignal: Signal<any> = toSignal(this.breakpointObserver.observe('(max-width: 1024px)').pipe(
    map(result => result.matches)),{initialValue : false});

  pantallaGrandeSignal: Signal<any> = computed(() => !this.pantallaEnanaSignal());
}
