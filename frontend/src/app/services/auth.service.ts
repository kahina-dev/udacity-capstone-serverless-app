import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { environment as env} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth0 : auth0.WebAuth;
  private authOptions: auth0.AuthOptions;
  accessToken:any;
  idToken:any;
  expiresAt:any;
  user:String;


  constructor(@Inject(DOCUMENT) private doc: Document,  private router: Router) {
    console.log("Calling auth service");
    this.authOptions = {
      domain: env.domain,
      clientID: env.clientId
    };

    this.auth0 = new auth0.WebAuth(this.authOptions);
   }

   public authorise() {
    this.auth0.authorize({
      redirectUri: 'http://localhost:4200',
      responseType: 'token id_token',
      scope: 'openid'
    });

  }

  public parseAccessToken() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log('id token: ', authResult.idToken)
        this.setSession(authResult);
      } else if (err) {
        console.log(err);
        //alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  public getUser(){
    this.auth0.client.userInfo(this.accessToken, (err, user)=>{
   if (user){
     this.user=user.name;
   }else if (err) {
    console.log(err);
   }
    });
  }

  setSession(authResult:any) {
    localStorage.setItem('isLoggedIn', 'true');
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.user=authResult.name;
    localStorage.setItem('id_token', authResult.idToken);
    console.log("Token is "+authResult.idToken);
    this.expiresAt = expiresAt;
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         this.setSession(authResult);
       } else if (err) {
         this.logout();
         console.log(err);
         alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
       }
    });
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('id_token');

    this.auth0.logout({
       returnTo: this.doc.location.origin
    });

    this.router.navigate(['/recipes/public']);

  }

  isAuthenticated(){
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }

}
