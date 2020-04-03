import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { CONFIG } from "../config";
import { BldgLocation } from "../models/bldgLocation";

const locationsUrl = CONFIG.Urls.baseApiUrl+'/locations';

@Injectable({
  providedIn: "root"
})
export class LocationsService {
  constructor(private http: HttpClient) {}

  getLocations(): Observable<BldgLocation[]> {
    return this.http
      .get<BldgLocation[]>(locationsUrl)
      .pipe(catchError(this.handleError));
  }

  getBuildings(): Observable<any[]> {
    return this.http
      .get<any[]>(locationsUrl+"/buildings")
      .pipe(catchError(this.handleError));
  }


  addBuilding(bldg: any): Observable<any> {
    //console.log(bldg)
    return this.http
      .post<BldgLocation>(locationsUrl + '/addLocation', bldg)
      .pipe(catchError(this.handleError));
  }



  updateBulding(Bulding: any): Observable<any> {
    //console.log(Bulding)
    return this.http
      .patch<BldgLocation>(locationsUrl + '/updateLocation/' + Bulding.locationId, Bulding)
      .pipe(catchError(this.handleError))
  }

  deleteBulding(BuldingId) {
    return this.http.delete(locationsUrl + "/deleteLocation/" + BuldingId)
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
