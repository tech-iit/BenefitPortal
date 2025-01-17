import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccessControlService {
  private allowAccess: boolean = false;


  setAccess(state: boolean): void {
    this.allowAccess = state;
  }

  getAccess(): boolean {
    return this.allowAccess;
  }
}
