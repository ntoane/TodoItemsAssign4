import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Item } from '../_models/item';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  baseUrl = environment.apiUrl + 'todoitems/';

  constructor(private http: HttpClient) { }

  addItem(item: Item) {
    return this.http.post(this.baseUrl, item);
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(this.baseUrl + id);
  }

  getItems(page?, itemsPerPage?): Observable<PaginatedResult<Item[]>> {
    const paginationResult: PaginatedResult<Item[]> = new PaginatedResult<Item []>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Item[]>(this.baseUrl, { observe: 'response', params })
      .pipe(
        map(response => {
          paginationResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginationResult.pagination = JSON.parse(response.headers.get('Pagination'))
          }
          return paginationResult;
        })
      );
  }

  getOverdueItems(page?, itemsPerPage?): Observable<PaginatedResult<Item[]>> {
    const paginationResult: PaginatedResult<Item[]> = new PaginatedResult<Item []>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Item[]>(this.baseUrl + 'overdue', { observe: 'response', params })
      .pipe(
        map(response => {
          paginationResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginationResult.pagination = JSON.parse(response.headers.get('Pagination'))
          }
          return paginationResult;
        })
      );
  }

  updateItem(item: Item) {
    return this.http.put(this.baseUrl + item.id, item);
  }

  deleteItem(id: number) {
    return this.http.delete(this.baseUrl + id);
  }

}
