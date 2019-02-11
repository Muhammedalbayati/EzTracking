import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { map, delay } from "rxjs/operators";
import {  ContainerService } from "../Services";

@Injectable()
export class ContainersReolver implements Resolve<any> {
  constructor(private containersService: ContainerService) {}

  resolve() {
    return this.containersService.getContainers().pipe(map(containers => containers));
    //.pipe(delay(5000));// for testing the resolver only
  }
}
