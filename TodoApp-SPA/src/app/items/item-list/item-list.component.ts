import { Component, OnInit } from '@angular/core';
import { faInfoCircle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Item } from 'src/app/_models/item';
import { ItemService } from 'src/app/_services/item.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ItemEditComponent } from '../item-edit/item-edit.component';
import { ItemDetailComponent } from '../item-detail/item-detail.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  detailIcon = faInfoCircle;
  editIcon = faEdit;
  deleteIcon = faTrashAlt;

  items: Item[];
  item: Item;
  pagination: Pagination;
  count = 1;

  bsModalRef: BsModalRef;

  constructor(private itemService: ItemService, private alertify: AlertifyService, private route: ActivatedRoute,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.items = data.items.result;
      this.pagination = data.items.pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadItems();
  }

  loadItems() {
    this.itemService.getItems(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<Item[]>) => {
        this.items = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  deleteItem(id: number) {
    this.alertify.confirm('Are you sure you want to delete this to-do item?', () => {
      this.itemService.deleteItem(id).subscribe(() => {
        this.items.splice(this.items.findIndex(i => i.id === id), 1);
        this.alertify.success('To-do item deleted successfully!');
      });
    });
  }

  editItemModal(item: Item) {
    const initialState = {
      item,
    };
    this.bsModalRef = this.modalService.show(ItemEditComponent, {initialState});
    this.bsModalRef.content.updateSelectedItem.subscribe(res => {
      this.item = res.data;
      if (this.item) {
        this.itemService.updateItem(this.item).subscribe(() => {
        this.loadItems();
        this.alertify.success('To-do item updated successfully');
        }, error => {
          console.log(error);
        });
      } else {
        this.alertify.error('Unable to update this to-do item');
      }
    });
  }

  detailItemModal(item: Item) {
    const initialState = {
      item,
    };
    this.bsModalRef = this.modalService.show(ItemDetailComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
