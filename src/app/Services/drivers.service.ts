import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { CONFIG } from "../config";
import { EzDriver } from "../models/ezDriver";


const driverUrl = CONFIG.Urls.baseApiUrl + '/drivers';

@Injectable({
  providedIn: "root"
})
export class DriversService {

  constructor(private http: HttpClient) { }

  getDrivers(): Observable<EzDriver[]> {
    return this.http
      .get<EzDriver[]>(driverUrl)
      .pipe(catchError(this.handleError));
  }

  addDriver(driver: any): Observable<any> {
    //console.log(driver)
    return this.http
      .post<EzDriver>(driverUrl + '/addDriver', driver)
      .pipe(catchError(this.handleError));
  }

  updateDriver(driver: any): Observable<any> {
    //console.log(driver)
    return this.http
      .patch<EzDriver>(driverUrl + '/updateDriver/' + driver.driverId, driver)
      .pipe(catchError(this.handleError))
  }

  deleteDriver(driverId) {
    return this.http.delete(driverUrl + "/deleteDriver/" + driverId)
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