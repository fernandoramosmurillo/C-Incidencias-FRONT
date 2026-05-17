import { LocalStorageService } from './Services/local-storage-service';
import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { alertCircle, alertCircleOutline, calendar, calendarOutline, caretDownSharp, chatboxOutline, chatbubbleEllipsesOutline, create, home, listOutline, logoAndroid, logoApple, logoGoogle, send} from 'ionicons/icons'
import { Router } from "@angular/router";
import { Usuario } from './Interfaces/usuario';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonRouterOutlet, IonApp],
})
export class AppComponent implements OnInit {

  private localstorageService = inject(LocalStorageService);
  private router = inject(Router);

  constructor() {
    addIcons({
      home,
      create,
      listOutline,
      logoGoogle,
      logoApple,
      logoAndroid,
      caretDownSharp,
      calendar,
      alertCircle,
      chatbubbleEllipsesOutline,
      send,
      chatboxOutline
    });
  }

  ngOnInit() {
    this.localstorageService.comprobarSesion();
  }
}
