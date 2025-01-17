import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        const { role } = JSON.parse(storedUserData);

        if (role === 'Admin') {
          this.router.navigate(['/app-restricted']); 
          return false; 
        } else {
          return true;
        }
      } catch (error) {
        this.router.navigate(['/app-restricted']);
        return true;
      }
    }
    this.router.navigate(['/app-restricted']);
     return false;
  }
}
