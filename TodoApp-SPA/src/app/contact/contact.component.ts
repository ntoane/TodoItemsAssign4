import { Component, OnInit } from '@angular/core';
import { faMapMarkerAlt, faMobileAlt, faBlenderPhone, faFax, faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  locationIcon = faMapMarkerAlt;
  phoneIcon = faBlenderPhone;
  cellIcon = faMobileAlt;
  faxIcon = faFax;
  emailIcon = faEnvelope;

  constructor() { }

  ngOnInit() {
  }

}
