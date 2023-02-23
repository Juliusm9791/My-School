import { EventEmitter, Injectable, Output } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: EventEmitter<boolean> = new EventEmitter();

  constructor(private fireAuth: Auth, private router: Router) {
    this.fireAuth.onAuthStateChanged((user) => {
      console.info('AUTH', !!user);
      this.isLoggedIn.emit(!!user);
    });
  }

  login(idToken: any): void {
    localStorage.setItem('id_token', idToken);
  }

  async logout() {
    try {
      await this.fireAuth.signOut();
      console.log('firelogout');
    } catch (error) {
      console.log(error);
    } finally {
      authState(this.fireAuth).subscribe((user) => {
        if (!user) {
          localStorage.removeItem('id_token');
          this.router.navigate(['/']);
          console.log('local logout');
        }
      });
    }
  }
}
