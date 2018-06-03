import {Injectable} from '@angular/core';

import * as jsonwebtoken from 'jsonwebtoken';

@Injectable()
export class JwtService {

  public user: any;
  public jwt: string;
  public jwtDecoded: any;

  public opCode = ''

  constructor() {
    this.loadSessionData();
  }

  public setSession(jwt: string, user){
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('user', JSON.stringify(user));
    this.loadSessionData();
  }

  public clearSession() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this.loadSessionData();
  }

  // TODO - refactor these function calls
  public static getUserFromToken(tkn) {
    return jsonwebtoken.decode(tkn).user
  }

  public isAuthenticated() {
    if (!this.jwt || !this.jwtDecoded) {
      this.opCode = 'NOT_SET'
      return false
    }
    if (this.jwtDecoded.exp < (new Date().getTime() / 1000)) {
      this.opCode = 'EXPIRED'
      return false
    }
    return true;
  }

  private loadSessionData() {
    this.jwt = localStorage.getItem('jwt');
    this.user = JSON.parse(localStorage.getItem('user'));

    if (this.jwt)
      this.jwtDecoded = jsonwebtoken.decode(this.jwt);
  }

}
