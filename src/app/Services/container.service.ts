import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Container } from '../models/container';

import { CONFIG } from '../config';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';


const containerUrl = CONFIG.Urls.baseApiUrl+'/containers';
@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  constructor(private http: HttpClient) {}

  getContainers(): Observable<Container[]> {
    return this.http
      .get<Container[]>(containerUrl)
      .pipe(catchError(this.handleError));
  }

  addContainer(container: any): Observable<any> {
    //console.log(container)
    return this.http
      .post<Container>(containerUrl + '/addContainer', container)
      .pipe(catchError(this.handleError));
  }
  

  updateContainer(Container: any): Observable<any> {
    //console.log(Container)
    return this.http
      .patch<Container>(containerUrl + '/updateContainer/' + Container.containerId, Container)
      .pipe(catchError(this.handleError))
  }

  deleteContainer(containerId) {
    return this.http.delete(containerUrl + "/deleteContainer/" + containerId)
      .pipe(catchError(this.handleError));
  }
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
                        status code ${error.status}`);
  }
  
}
