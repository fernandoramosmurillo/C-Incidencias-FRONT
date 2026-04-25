import { Component } from '@angular/core';
import { IonApp } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { create, home} from 'ionicons/icons'
import { RouterOutlet } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, RouterOutlet, ReactiveFormsModule],
})
export class AppComponent {
  constructor() {
    addIcons({
      home,
      create
    });
  }
}
