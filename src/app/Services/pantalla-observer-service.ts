import { BreakpointObserver } from '@angular/cdk/layout';
import { computed, inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PantallaObserverService {
  breakpointObserver = inject(BreakpointObserver);

  pantallaEnanaSignal: Signal<any> = toSignal(this.breakpointObserver.observe('(max-width: 1024px)').pipe(
    map(result => result.matches)),{initialValue : false});

  pantallaGrandeSignal: Signal<any> = computed(() => !this.pantallaEnanaSignal());
}
