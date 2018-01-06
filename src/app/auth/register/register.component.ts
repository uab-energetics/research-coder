import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService, RegisterRequest} from "../../shared/auth/auth.service";
import {NotifyService} from "../../shared/services/notify.service";

class RegisterFormModel {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public passwordConfirm: string
  ) {}
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {

  model = new RegisterFormModel('', '', '', '');

  constructor(
    private router: Router,
    private authService : AuthService,
    private notify: NotifyService
  ) { }

  onSubmit() {
    let formData = this.exportFormData();
    this.authService.register(formData)
      .subscribe((data) => {
        console.log("registered and logged in!", data);
      }, error => {
        console.log(error);
        this.notify.alert("Invalid", error.error.msg, "error");
      });
  }

  exportFormData(): RegisterRequest {
    let {name, email, password} = this.model;
    return {name, email, password};
  }

  ngOnInit(): void {
    document.body.classList.add('page-login-v3', 'layout-full');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('page-login-v3', 'layout-full');
  }

}
