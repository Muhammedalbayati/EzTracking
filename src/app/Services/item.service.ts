import { Injectable } from "@angular/core";

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { CONFIG } from "../config";
import { catchError } from "rxjs/operators";
import { Item } from "../models/item";

const itemsUrl = CONFIG.Urls.baseApiUrl + "/items";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
    //,'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: "root"
})
export class ItemService {
  constructor(private http: HttpClient) {}

  addItem(item: Item): Observable<Item> {
    return this.http
      .post<Item>(itemsUrl, item, httpOptions)
      .pipe(catchError(this.handleError));
  }

  log(error) {
    console.warn("Handler caught an error", error);
  }

  getItems(bolId): Observable<Item[]> {
    return this.http
      .get<Item[]>(itemsUrl + "/" + bolId)
      .pipe(catchError(this.handleError));
  }

  deleteItem(itemId) {
    return this.http.delete(itemsUrl + "/" + itemId);
    // .pipe(catchError(this.handleError));
  }
  // //https://angular.io/guide/http
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(`Something bad happened; please try again later.
                      status code ${error.status}, msg : ${
      error.error.message
    }`);
  }
}
