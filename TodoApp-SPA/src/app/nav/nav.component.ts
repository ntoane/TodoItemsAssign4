import { Component, OnInit } from '@angular/core';
import { faSignOutAlt, faListAlt } from '@fortawesome/free-solid-svg-icons';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  signOutIcon = faSignOutAlt;
  listIcon = faListAlt;
  model: any = {};

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error(error);
      console.log(error);
    }, () => {
      this.router.navigate(['/itemlists']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.alertify.message('Logged out successfully');
    this.router.navigate(['/home']);
  }

}
