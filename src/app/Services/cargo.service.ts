import { Injectable } from '@angular/core';
import { CONFIG } from '../config';
import { Cargo } from '../models/cargo';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

const cargoUrl = CONFIG.Urls.baseApiUrl + '/cargos';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(private http: HttpClient) { }

  getCargos(): Observable<Cargo[]> {
    return this.http
      .get<Cargo[]>(cargoUrl)
      .pipe(catchError(this.handleError));
  }

  addCargo(cargo: any): Observable<any> {
    ////console.log(cargo)
    return this.http
      .post<Cargo>(cargoUrl + '/addCargo', cargo)
      .pipe(catchError(this.handleError));
  }


  updateCargo(cargo: any): Observable<any> {
    ////console.log(cargo)
    return this.http
      .patch<Cargo>(cargoUrl + '/updateCargo/' + cargo.cargoId, cargo)
      .pipe(catchError(this.handleError))
  }

  deleteCargo(cargoId) {
    return this.http.delete(cargoUrl + "/deleteCargo/" + cargoId)
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
