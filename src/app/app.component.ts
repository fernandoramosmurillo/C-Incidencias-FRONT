import { Component } from '@angular/core';
import { IonApp } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { create, home, logoAndroid, logoApple, logoGoogle} from 'ionicons/icons'
import { RouterOutlet } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '@env/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, RouterOutlet, ReactiveFormsModule],
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
