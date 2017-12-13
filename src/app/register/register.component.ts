import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

class RegisterFormModel {
  constructor(
    private name: string,
    private email: string,
    private password: string,
    private passwordConfirm: string
  ) {}
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  model = new RegisterFormModel('', '', '', '');

  constructor(private router: Router) { }

  onSubmit() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    document.body.classList.add('page-login-v3', 'layout-full');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('page-login-v3', 'layout-full');
  }

}
