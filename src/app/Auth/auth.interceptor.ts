import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var token = localStorage.getItem("userToken");

    if (token) {
      const newReq = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token)
      });

      return next.handle(newReq);
    } else {
      return next.handle(req);
    }
  }
}
