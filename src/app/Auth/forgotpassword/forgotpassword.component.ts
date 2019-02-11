import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "src/app/Services";
import { Toastr, TOASTR_TOKEN } from "src/app/common";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";

@Component({
  selector: "ez-forgotpassword",
  templateUrl: "./forgotpassword.component.html",
  styleUrls: ["./forgotpassword.component.css"]
})
export class ForgotpasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  errorMsg: string = "";

  email: FormControl = new FormControl("", [Validators.required]);

  constructor(
    private authServices: AuthenticationService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.forgotPasswordForm = new FormGroup({
      email: this.email
    });
  }

  resetPassword() {
    this.spinner.show();
    this.authServices.resetPassword(this.email.value).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.router.navigate(["/login"]);
        // this.loginForm.reset();
         this.toastr.success("Please check your email");
      },
      (err: any) => {
        this.spinner.hide();
        this.toastr.error(err);
        this.errorMsg = err;
      }
    );
  }
}
