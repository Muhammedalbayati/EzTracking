import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "../Services";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authServices: AuthenticationService
  ) {} //Muhammed: I added this constructor

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem("userToken");
    if (token) {
      var roles = next.data["roles"] as Array<string>;

      if (roles) {
        var match = this.authServices.roleMatch(roles);
        if (match) return true;
      } else {
        this.router.navigate(["/forbidden"]);
      }
    }

    this.router.navigate(["/login"]);
    return false;
  }
}
