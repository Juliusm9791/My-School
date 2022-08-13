import { EventEmitter, Injectable, Output } from '@angular/core';
import decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any;
  isLoggedIn: boolean = false;
  
  constructor() { }

  @Output() changeLoggedIn: EventEmitter<boolean> = new EventEmitter();

  login(idToken: any): void {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
    this.isLoggedIn = true
    this.changeLoggedIn.emit(this.isLoggedIn)
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    this.isLoggedIn = false
    this.changeLoggedIn.emit(this.isLoggedIn)
  }

  getProfile() {
    this.getToken();
    if (this.token) {
      return decode(this.token);
    }
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    this.getToken();
    if (this.token && !this.isTokenExpired(this.token)) {
      this.isLoggedIn = true
      this.changeLoggedIn.emit(this.isLoggedIn)
    }
  }

  isTokenExpired(token: any) {
    try {
      const decoded: any = decode(token);
      if (decoded.exp < Date.now() / 100000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    this.token = localStorage.getItem("id_token");
  }

}
