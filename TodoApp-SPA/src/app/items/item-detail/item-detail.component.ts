import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Item } from 'src/app/_models/item';
import { faInfoCircle, faQuestion, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  item: Item;
  nameIcon = faInfoCircle;
  statusIcon = faQuestion;
  duedateIcon = faCalendarAlt;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
