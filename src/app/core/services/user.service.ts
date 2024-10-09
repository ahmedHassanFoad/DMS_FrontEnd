import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  http=inject(HttpClient);
  getUser():Observable<any>{
   return this.http.get("https://localhost:7227/api/Accounts/currentUser");
  }
}
