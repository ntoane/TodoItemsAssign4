import { Component, OnInit } from '@angular/core';
import { faSignOutAlt, faListAlt } from '@fortawesome/free-solid-svg-icons';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  signOutIcon = faSignOutAlt;
  listIcon = faListAlt;
  model: any = {};

  constructor(private alertify: AlertifyService) { }

  ngOnInit() {
  }

}
