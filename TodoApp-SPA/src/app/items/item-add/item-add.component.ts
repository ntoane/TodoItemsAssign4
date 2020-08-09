import { Component, OnInit } from '@angular/core';
import { Item } from '../../_models/item';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemService } from 'src/app/_services/item.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {
  item: Item;
  addItemForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private itemService: ItemService, private router: Router, private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-dark-blue'
    };
    this.createAddItemForm();
  }

  createAddItemForm() {
    this.addItemForm = this.fb.group({
      task: ['', Validators.required],
      isComplete: ['false'],
      dueDate: [null, Validators.required]
    });
  }

  addItem() {
    if (this.addItemForm.valid) {
      this.item = Object.assign({}, this.addItemForm.value);
      this.itemService.addItem(this.item).subscribe(() => {
      this.alertify.success('TodoItem created successfuly!');
      this.router.navigate(['/itemlists']);
      }, error => {
        this.alertify.error(error);
      });
      console.log(this.item);
    }else {
      this.alertify.error('The submitted form is invalid!');
    }
  }

}
