import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  http: HttpClient = inject(HttpClient);

  obtenerDatos(url: string) {
    return this.http.get(url).forEach
}
