import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { map, delay } from "rxjs/operators";
import { VehiclesService } from "../Services";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class VehiclesReolver implements Resolve<any> {
  constructor(private vehiclesService: VehiclesService,private spinner: NgxSpinnerService) {}

  resolve() {
    return this.vehiclesService.getVehicles().pipe(
      map(vehicles => vehicles)
    );
    //.pipe(delay(5000));// for testing the resolver only
  }
}
