import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { CONFIG } from "../config";
import { Vehicle } from "../models/vehicle";

const vehiclesUrl = CONFIG.Urls.baseApiUrl + '/vehicles';

@Injectable({
  providedIn: "root"
})
export class VehiclesService {
  constructor(private http: HttpClient) { }

  getVehicles(): Observable<Vehicle[]> {
    return this.http
      .get<Vehicle[]>(vehiclesUrl)
      .pipe(catchError(this.handleError));
  }

  addVehicle(vehicle: any): Observable<any> {
    //console.log(vehicle)
    return this.http
      .post<Vehicle>(vehiclesUrl + '/addVehicle', vehicle)
      .pipe(catchError(this.handleError));
  }


  updateVehicle(Vehicle: any): Observable<any> {
    //console.log(Vehicle)
    return this.http
      .patch<Vehicle>(vehiclesUrl + '/updateVehicle/' + Vehicle.vehicleId, Vehicle)
      .pipe(catchError(this.handleError))
  }

  deleteVehicle(vehicleId) {
    return this.http.delete(vehiclesUrl + "/deleteVehicle/" + vehicleId)
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
