import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { BldgsChart } from '../models/BldgsCharts';
import { CONFIG } from '../config';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import * as moment from "moment";
import { Last12MonthsChart } from '../models/Last12MonthsChart';


const chartsUrl = CONFIG.Urls.charts;

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private http: HttpClient) { }

  // getBldgsChartsData(): Observable<BldgsChart[]> {
  //   return this.http
  //     .get<BldgsChart[]>(chartsUrl)
  //     .pipe(catchError(this.handleError));
  // }

  getChartData(data:any): Observable<BldgsChart[]> {

    return this.http.post<BldgsChart[]>(chartsUrl + '/completed/', data)
      .pipe(catchError(this.handleError));
  }

  getLast12MonthsChartData(): Observable<Last12MonthsChart[]> {

    return this.http.get<Last12MonthsChart[]>(chartsUrl + '/last12MonthsChart/')
      .pipe(catchError(this.handleError));
  }

  // getCompletedBols(data: object) {
  //   return this.http.post<Bol[]>(bolUrl + '/completed/', data)
  //     .pipe(catchError(this.handleError));
  // }

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

