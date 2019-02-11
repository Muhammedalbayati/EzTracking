import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormsModule } from "@angular/forms";
import { AdminRoutingModule, AdminRoutedComponents } from './admin.routing';
import { DecodeUrlPipe, SharedModule} from '../common';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [AdminRoutedComponents, DecodeUrlPipe]
})
export class AdminModule { }
