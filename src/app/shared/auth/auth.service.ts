import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {AppUser} from "../../models/AppUser";
import {Observable} from "rxjs/Observable";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthenticatedResponse {
  status: string;
  message: string;
  token: string;
  user: AppUser;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) { }

  login(loginRequest: LoginRequest): Observable<any> {
    let source = this.http.post(environment.api + '/auth/login', loginRequest)
      .share();

    source.subscribe((jwt_response: AuthenticatedResponse) => {
      const jwt = jwt_response.token;
      const user = jwt_response.user;

      this.userService.setSession(jwt, user);

      let url = (localStorage.redirectOnAuth || "/");
      let params = {};
      if(localStorage.redirectOnAuthParams)
        params = JSON.parse(localStorage.redirectOnAuthParams);
      console.log(params);
      this.router.navigate([url], {queryParams: params})
    });

    return source;
  }

  register (registerRequest : RegisterRequest) : Observable<any> {
    let source = this.http.post(environment.api + '/auth/register', registerRequest)
      .share();

    source.subscribe((jwt_response : AuthenticatedResponse) => {
      console.log(jwt_response);
      const jwt = jwt_response.token;
      const user = jwt_response.user;

      this.userService.setSession(jwt, user);

      let url = (localStorage.redirectOnAuth || "/");
      let params = {};
      if(localStorage.redirectOnAuthParams)
        params = JSON.parse(localStorage.redirectOnAuthParams);
      this.router.navigate([url], {queryParams: params})
    });

    return source;
  }

  logout() {
    this.userService.clearSession();
    this.router.navigate(['/auth/login']);
    delete localStorage.redirectOnAuth;
    delete localStorage.redirectOnAuthParams;
  }

  setRedirectURL(url, params?){
    localStorage.redirectOnAuth = url;
    if(params) localStorage.redirectOnAuthParams = JSON.stringify(params);
  }

}
