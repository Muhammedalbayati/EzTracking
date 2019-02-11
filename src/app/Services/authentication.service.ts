import { Injectable } from "@angular/core";
import { throwError, Observable, of } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { User } from "../models/user";
import { CONFIG } from "../config";
import { catchError } from "rxjs/operators";
import { strictEqual } from "assert";

const Urls = CONFIG.Urls;

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(email, password) {
    var userData =
      "userName=" + email + "&password=" + password + "&grant_type=password";
    var headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    return this.http
      .post(Urls.serverUrl + "/token", userData, { headers })
      .pipe(catchError(this.handleError));
  }

  public get isLoggedIn(): boolean {
    if (localStorage.getItem("userToken") != null) {
      return true;
    } else {
      return false;
    }
  }

  registerUser(user: any) {
    const body: User = {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.email,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      building: user.building,
      shift: user.shift,
      badge: user.badge
    };

    return this.http
      .post(Urls.baseApiUrl + "/Account/Register", body)
      .pipe(catchError(this.handleError));

    // return this.http.post(baseUrl + "/Account/Register", body);
  }

  resetPassword(email: any) {
    const body: object = {
      Email: email
    };
    return this.http
      .post(Urls.baseApiUrl + "/Account/ForgotPassword", body)
      .pipe(catchError(this.handleError));
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;

    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo == null) return false;
    if (userInfo.roles != null) {
      allowedRoles.forEach(element => {
        if (userInfo.roles.indexOf(element) > -1) {
          isMatch = true;
          return false;
        }
      });
    }

    return isMatch;
  }

  loggedinUserName() {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo == null) return "";
    return userInfo.firstName + ' ' + userInfo.lastName;
  }

  logOut() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");
  }
  // //https://angular.io/guide/http
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    console.log(error);
    return throwError(error)
    // if (error.statusText)
    //   return throwError(`${error.statusText}: status : ${error.status}`);

    // if (error.error["error_description"] != null)
    //   return throwError(` msg : ${error.error["error_description"]} `);

    // if (error.error["message"] != null)
    //   return throwError(` msg : ${error.error["message"]}`);
  }
}
