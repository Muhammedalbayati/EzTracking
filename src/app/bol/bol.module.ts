import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { BolFormComponent } from './bol-form/bol-form.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule, ModalTriggerDirective } from '../common';


@NgModule({
  declarations: [
    //  ModalTriggerDirective, 
    BolFormComponent,
    ItemFormComponent,
    ItemsListComponent,
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule,
  ],
  exports: [
    BolFormComponent,
    ItemFormComponent,
    ItemsListComponent,
  ]
})
export class BolModule { }
