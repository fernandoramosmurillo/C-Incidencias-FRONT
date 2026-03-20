import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonCol, IonGrid, IonRow, IonText, IonCardContent, IonCardHeader, IonCard, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardTitle, IonCard, IonCardHeader, IonCardContent, IonText, IonRow, IonGrid, IonCol, IonContent, IonHeader, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
