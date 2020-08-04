import { Component, OnInit } from '@angular/core';
import { faHandPointRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  handIcon = faHandPointRight;

  constructor() { }

  ngOnInit() {
  }

}
