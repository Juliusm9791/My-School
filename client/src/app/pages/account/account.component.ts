import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.changeLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnInit(): void {
    this.authService.loggedIn();
    this.isLoggedIn = this.authService.isLoggedIn;

    if (this.isLoggedIn) {
      this.router.navigate(['/account/profile']);
    } else {
      this.router.navigate(['/account/login']);
    }
  }
}
