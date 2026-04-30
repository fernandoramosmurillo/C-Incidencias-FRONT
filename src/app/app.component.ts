import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { create, home, logoAndroid, logoApple, logoGoogle} from 'ionicons/icons'
import { RouterOutlet } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonRouterOutlet, IonApp, ReactiveFormsModule],
})
export class AppComponent {

  constructor() {
    addIcons({
      home,
      create,
      logoGoogle,
      logoApple,
      logoAndroid
    });
  }
}
