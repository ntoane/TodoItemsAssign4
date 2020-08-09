import { Injectable } from '@angular/core';
import { Item } from '../_models/item';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ItemService } from '../_services/item.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()

export class ItemOverdueResolver implements Resolve<Item[]> {
    pageNumber = 1;
    pageSize = 10;

    constructor(private itemService: ItemService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Item[]> {
        return this.itemService.getOverdueItems(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
