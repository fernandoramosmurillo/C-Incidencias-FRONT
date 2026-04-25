import { CapacitorHttp } from '@capacitor/core';
import { Ciudadano } from './../../../Interfaces/ciudadano';
import { Component, OnInit } from '@angular/core';
import { IonInput, IonGrid, IonItem, IonLabel, IonCol, IonRow, IonList, IonText, IonButton } from "@ionic/angular/standalone";
import { RolesUsuario, TiposAcceso, Usuario } from 'src/app/Interfaces/usuario';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  imports: [IonButton, IonText, IonList, IonRow, IonCol, IonLabel, IonItem, IonGrid, IonInput, FormsModule],
})
export class LoginFormComponent {

  usuario: Usuario = {
    estado: '',
    idUsuario: '',
    nombre: '',
    apellidos: '',
    correoElectronico: '',
    clave: '',
    fechaNacimiento: null,
    fechaCreacion: null,
    fechaEliminacion: null,
    fotoPerfilUrl: null,
    bloqueado: false,
    recibirNotificaciones: false,
    notificacionesRecibidas: [],
    rolUsuario: RolesUsuario.CIUDADANO,
    tipoAcceso: TiposAcceso.CORREO_CONTRASEÑA
  };


}
