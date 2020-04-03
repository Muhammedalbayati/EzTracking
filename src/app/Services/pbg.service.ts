import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Pbg } from '../models/pbg';
import { CONFIG } from '../config';
import { catchError } from 'rxjs/operators';

const pbgsUrl = CONFIG.Urls.baseApiUrl+'/pbgs';

@Injectable({
  providedIn: 'root'
})
export class PbgService {

  constructor(private http: HttpClient) {}

  getPbgs(): Observable<Pbg[]> {
    return this.http
      .get<Pbg[]>(pbgsUrl)
      .pipe(catchError(this.handleError));
  }


  addPbg(pbg: any): Observable<any> {
    //console.log(pbg)
    return this.http
      .post<Pbg>(pbgsUrl + '/addPbg', pbg)
      .pipe(catchError(this.handleError));
  }

  updatePbg(Pbg: any): Observable<any> {
    //console.log(Pbg)
    return this.http
      .patch<Pbg>(pbgsUrl + '/updatePbg/' + Pbg.pbgId, Pbg)
      .pipe(catchError(this.handleError))
  }

  deletePbg(pbgId) {
    return this.http.delete(pbgsUrl + "/deletePbg/" + pbgId)
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
