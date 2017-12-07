import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from "@angular/http";

import { Login } from "./login";

import "rxjs/add/operator/toPromise";

@Injectable()
export class AuthService {
  //server URL.
  private loginUrl = 'http://127.0.0.1:4100/login';

  //define the header options of non-json formatted data
  private headers = new Headers({
    'Content-Type':'application/x-www-form-urlencoded',
  });

  //variable to get the success of login data.
  public result_check :boolean;

  constructor(private http: Http) { }
  
  public postmethod(username: string, password: string): Promise<any> {
    // If you want to send non-json formatted data to a server,
    // You need to set the header options correctly and encode the body
    // like this:
    let body = `username=${username}&password=${password}`;

    return this.http
      .post(this.loginUrl, body , {headers: this.headers})
      .toPromise()
      .then( res => {
        //You may check!
        console.log("login success",res.json().success);
        //get login'success(True/False) from the server.
        this.result_check = res.json().success;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> { 
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }

}
