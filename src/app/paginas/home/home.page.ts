import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonCol, IonGrid, IonRow, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonText, IonRow, IonGrid, IonCol, IonContent, IonHeader, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
