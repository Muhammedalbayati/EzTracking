import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { BolService } from './bol.service';

@Injectable()
export class BolResolver implements Resolve<any> {

    constructor(private bolService:BolService) {

     }


     resolve(){
         return this.resolve
     }
}