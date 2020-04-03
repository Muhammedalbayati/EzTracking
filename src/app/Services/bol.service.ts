import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { throwError, Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { CONFIG } from "../config";
import { Bol } from "../models/bol";

import { SearchResult } from "../models/searchResult";
import { BolUpdate } from "../models/bolUpdate";


// import 'rxjs/add/operator/catch'
// import 'rxjs/add/observable/throw'
const bolUrl = CONFIG.Urls.baseApiUrl + '/bols';
// const httpOptions = {
//   headers: new HttpHeaders({
//     "Content-Type": "application/json"
//     //,'Authorization': 'my-auth-token'
//   })
// };

@Injectable({
  providedIn: "root"
})
export class BolService {
  // public bols: Bol[] = [];
  searchResult: any[] = [];

  constructor(private http: HttpClient) { }
  // //john pappa
  // getBols() {
  //   return this.http
  //     .get(bolUrl)
  //     .pipe(
  //       map((data: any) => 
  //         <Bol[]>data),
  //       catchError(this.handleError)
  //     )
  //     .toPromise();
  // }

  //HttpClient.get returns response data
  // HttpClient.get returns the body of the response as an untyped JSON object by default.
  // Applying the optional type specifier, <Hero[]> , gives you a typed result object.

  getBols(isSubmitted?: boolean, isCompleted?: boolean): Observable<Bol[]> {
    return this.http.get<Bol[]>(bolUrl + "/" + isSubmitted + "/" + isCompleted)
      .pipe(catchError(this.handleError));
  }


  getUserIsSubmittedBols(isSubmitted: boolean): Observable<Bol[]> {
    var _userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const userId=_userInfo.firstName.substring(1,0)+_userInfo.lastName+ _userInfo.badge
    //console.log(_userInfo)
    return this.http.get<Bol[]>(bolUrl + "/isSubmitted/" + userId + "/" + isSubmitted)
      .pipe(catchError(this.handleError));
  }



  getCompletedBols(data: object) {
    return this.http.post<Bol[]>(bolUrl + '/completed/', data)
      .pipe(catchError(this.handleError));
  }

  getBolDetails(bolId): Observable<Bol> {
    return this.http.get<Bol>(bolUrl + '/' + bolId)
      .pipe(catchError(this.handleError));
  }


  getBolToPrint(bolId): Observable<any> {
    return this.http.get<any>(bolUrl + '/getBolToPrint/' + bolId)
      .pipe(catchError(this.handleError));
  }

  // getBols(){
  //   return this.http.get(bolUrl).pipe(
  //     map((data: any) => <Bol[]>data),
  //     tap(data => this.bols=data),
  //     catchError(this.handleError)
  //   );
  // }

  updateBol(bol: any): Observable<Bol> {
    //console.log("update bol func")
    //console.log('bol service Bol update', bol)
    return this.http
      .patch<Bol>(bolUrl + '/updatebol/' + bol.bolId, bol)
      .pipe(catchError(this.handleError))
  }


  actionsUpdate(bol: any): Observable<Bol> {
    //console.log("update bol func")
    //console.log('bol service Bol update', bol)
    return this.http
      .patch<Bol>(bolUrl + '/actionsUpdate/' + bol.bolId, bol)
      .pipe(catchError(this.handleError))
  }

  addBol(bolCreate: any): Observable<Bol> {
    // bolCreate.driverId = 1;
    //console.log(bolCreate)
    return this.http
      .post<Bol>(bolUrl + '', bolCreate)
      .pipe(catchError(this.handleError));
  }

  // searchBols(searchTerm: string) {
  //   var term = searchTerm;
  //   return this.http
  //     .get<SearchResult[]>(bolUrl + "/search/" + term)
  //     .pipe(catchError(this.handleError));
  // }


  searchBols(searchTerm: any) {
    //console.log(searchTerm)

    return this.http
      .post<SearchResult[]>(bolUrl + "/search", searchTerm)
      .pipe(catchError(this.handleError));
  }

  deleteBol(bolId) {
    return this.http.delete(bolUrl + "/" + bolId)
      .pipe(catchError(this.handleError));
  }


  log(error) {
    console.warn("Handler caught an error", error);
  }




  // //https://angular.io/guide/http
  private handleError(error: HttpErrorResponse) {
    //console.log(JSON.stringify(error))
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      //console.log("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(`Something bad happened; please try again later.
                        status code ${error.status}, msg : ${
      JSON.stringify(error)
      }`);
  }

  // private handleError(error: HttpErrorResponse) {
  //   let dataError = new BolError();
  //   dataError.errorNumber = 100;
  //   dataError.friendlyMessage = "An error occurred retrieving data";
  //   dataError.message = error.statusText;
  //   return throwError(dataError);
  // }
}
