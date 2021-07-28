import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class RedirectLoginGuard implements CanActivate {
  constructor(private router: Router) {}
  async canActivate() {
    const token = await localStorage.getItem('accessToken');
    if (token) {
      this.router.navigate(['/app/documents-upload']);
    } else {
      return true;
    }
  }
}
