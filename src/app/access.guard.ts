import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccessControlService } from './access-control.service';

@Injectable({
  providedIn: 'root',
})
export class AccessGuard implements CanActivate {
  constructor(private accessControl: AccessControlService, private router: Router) {}

  canActivate(): boolean {
    if (this.accessControl.getAccess()) {
      return true;
    } else {
      // Navigate to a different route or show an error message
      this.router.navigate(['/app-restricted']);
      return false;
    }
  }
}
