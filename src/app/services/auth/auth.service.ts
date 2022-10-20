import { EventEmitter, Injectable, Output } from '@angular/core';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: any;
  private isUserLoggedIn: boolean = false;

  constructor() {}

  @Output() changeLoggedIn: EventEmitter<boolean> = new EventEmitter();

  login(idToken: any): void {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    this.isUserLoggedIn = true;
    this.changeLoggedIn.emit(this.isUserLoggedIn);
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    this.isUserLoggedIn = false;
    this.changeLoggedIn.emit(this.isUserLoggedIn);
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    this.getToken();
    if (this.token && !this.isTokenExpired(this.token)) {
      this.isUserLoggedIn = true;
      this.changeLoggedIn.emit(this.isUserLoggedIn);
    } else {
      this.isUserLoggedIn = false;
      this.changeLoggedIn.emit(this.isUserLoggedIn);
    }
  }

  private isTokenExpired(token: any) {
    try {
      const decoded: any = decode(token);
      if (decoded.exp < Date.now() / 100000) {
        return true;
      } else {
        // localStorage.removeItem('id_token');
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  private getToken() {
    // Retrieves the user token from localStorage
    this.token = localStorage.getItem('id_token');
  }

  get isLoggedIn() {
    return this.isUserLoggedIn;
  }
}
