import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { map, delay } from "rxjs/operators";
import { LocationsService } from "../Services";

@Injectable()
export class BldgLocationsReolver implements Resolve<any> {
  constructor(private locationsService: LocationsService) {}

  resolve() {
    return this.locationsService
      .getLocations()
      .pipe(map(bldgLocations => bldgLocations))
      //.pipe(delay(5000));// for testing the resolver only 
  }
}
