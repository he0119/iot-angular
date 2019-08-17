import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  constructor(private swUpdate: SwUpdate, private snackbar: MatSnackBar) {
    this.swUpdate.available.subscribe(event => {
      let availableString: string;
      let reloadString: string;
      availableString = 'Update Available';
      reloadString = 'Reload';

      console.log('current version is', event.current);
      console.log('available version is', event.available);

      const snack = this.snackbar.open(availableString, reloadString, {
        duration: 6000,
      });

      snack
        .onAction()
        .subscribe(() => {
          swUpdate.activateUpdate().then(() => document.location.reload());
        });
    });
  }
}
