import { Injectable } from '@angular/core';
import { CONFIG } from "../config";
import { catchError } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";

import { throwError, Observable, of } from "rxjs";
import { UsersListVm } from '../models/usersInfoVm';
import { User } from '../models/user';


const Urls = CONFIG.Urls;
const adminUrl = CONFIG.Urls.baseApiUrl + '/admin';
const rolesUrl = CONFIG.Urls.baseApiUrl + '/roles';

@Injectable({
  providedIn: 'root'
})
export class AdminService {



  constructor(private http: HttpClient) { }


  getAllUsers(): Observable<UsersListVm[]> {
    return this.http.get<UsersListVm[]>(adminUrl + "/getallusers")
      .pipe(catchError(this.handleError));
  }

  getAllRoles(): Observable<any[]> {
    return this.http.get<any[]>(adminUrl + "/allroles")
      .pipe(catchError(this.handleError));
  }
  getUserDetail(userId: string): Observable<UsersListVm[]> {
    return this.http.get<UsersListVm[]>(adminUrl + "/userDetail/" + userId)
      .pipe(catchError(this.handleError));
  }

updateUser(user){
  //console.log(user)
  return this.http
  .patch<any>(adminUrl + '/updateUser', user)
  .pipe(catchError(this.handleError))
}
  deleteUser(userId) {
    return this.http.delete(adminUrl + "/deleteUser/" + userId)
      .pipe(catchError(this.handleError));
  }

  AssignUserToRole(userId,roleName){

    return this.http
    .get<any>(adminUrl + '/assignUserToRole/'+ userId+"/"+roleName)
    .pipe(catchError(this.handleError))
  }
  

  // setSelectedUser(user) {
  //   this._selectedUser = user;
  //   //console.log(this._selectedUser)
  // }

  // getSelectedUser() {
  //   return this._selectedUser;
  // }
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
