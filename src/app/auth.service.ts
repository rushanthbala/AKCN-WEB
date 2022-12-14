import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}
  isUserLoggedIn(): boolean {
    if (localStorage.getItem('auth') != null) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
