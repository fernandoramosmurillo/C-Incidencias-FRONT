import { Injectable } from '@angular/core';
import { GeoPoint } from 'firebase/firestore';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  //Centro exacto del pueblo (Plaza de la Constitución)
  private centroCantillana: L.LatLngExpression = [37.611047, -5.82353];

  esquinaSO = L.latLng(37.600233, -5.834888);
  esquinaNE = L.latLng(37.621474, -5.812693);
  limites = L.latLngBounds(this.esquinaSO, this.esquinaNE);

  coordenadas = this.centroCantillana; // Valor por defecto (Cantillana)
  map!: L.Map;
  iconoModerno = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Un pin más estilizado
    iconSize: [38, 38], // Tamaño del icono
    iconAnchor: [19, 38], // Punto del icono que corresponde a la coordenada exacta
    popupAnchor: [0, -38],
  });

  crearMapa(containerId: string) {
    // Si ya existe un mapa, lo borramos para que no de error al volver a entrar
    if (this.map) {
      this.map.remove();
    }

    this.map = L.map(containerId, {
      maxBounds: this.limites,
      maxBoundsViscosity: 1.0,
      minZoom: 13,
      maxZoom: 20,
    }).setView(this.centroCantillana, 17); // Cantillana

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 20,
      },
    ).addTo(this.map);

    // Añadir un marcador que el usuario pueda mover
    const marker = L.marker(this.centroCantillana, { draggable: true, icon: this.iconoModerno }).addTo(
      this.map,
    );

    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 500); // Le damos medio segundo para que Ionic termine la animación

    marker.on('dragend', () => {
      const position = marker.getLatLng();

      if (!this.limites.contains(position)) {
        marker.setLatLng([37.609, -5.924]);
        this.coordenadas = { lat: 37.609, lng: -5.924 };
      } else {
        // Si el usuario suelta el pin fuera de los límites, lo devolvemos al centro
        this.coordenadas = { lat: position.lat, lng: position.lng };
      }
    });
  }

  devolverCordenadas() {
    const elemento = L.latLng(this.coordenadas);
    return new GeoPoint(elemento.lat, elemento.lng).toJSON();
  }
}
