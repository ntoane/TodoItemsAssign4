import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Item } from 'src/app/_models/item';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  // @Output() updateSelectedItem = new EventEmitter<Item>();
  public updateSelectedItem: EventEmitter<any> = new EventEmitter();
  item: Item;
  bsConfig: Partial<BsDatepickerConfig>;
  editItemForm: FormGroup;

  constructor(public bsModalRef: BsModalRef, private alertify: AlertifyService, private fb: FormBuilder) {}

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-dark-blue'
    };
    this.createEditItemForm();
  }

  createEditItemForm() {
    this.editItemForm = this.fb.group({
      id: [this.item.id],
      task: [this.item.task, Validators.required],
      isComplete: [this.item.isComplete.toString()],
      dueDate: [new Date(this.item.dueDate), Validators.required]
    });
  }

  editItem(item: Item) {
    if (this.editItemForm.valid) {
      item = Object.assign({}, this.editItemForm.value);
      this.updateSelectedItem.emit({ data: item , res: 200  });
      this.bsModalRef.hide();
    } else {
      this.alertify.error('The submitted form is invalid');
    }
  }

}
