import { Component, OnInit } from '@angular/core';
import { faHandPointRight} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  handIcon = faHandPointRight;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

}
