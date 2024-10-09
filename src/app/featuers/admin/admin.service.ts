import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../../core/auth/models/user.model';
import { PaginatedResponse } from '../../shared/components/models/pagination-response.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  listAllUsers(pageSize: number, pageNumber: number): Observable<PaginatedResponse<UserDto>> {
    const params = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('pageNumber', pageNumber.toString());
   return this.http.get<PaginatedResponse<UserDto>>("https://localhost:7227/api/Admin/ListUsers",{params})
  }
  lockUser(id:number ):Observable<any>{
    return this.http.post(`https://localhost:7227/api/Admin/LockUserById?userId=${id}`,null)
  }
  UnlockUser(id:number ):Observable<any>{
    return this.http.post(`https://localhost:7227/api/Admin/UnlockUserById?userId=${id}`,null)
  }
  listAllBlockedUsers(pageSize: number, pageNumber: number): Observable<PaginatedResponse<UserDto>> {
    const params = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('pageNumber', pageNumber.toString());

    return this.http.get<PaginatedResponse<UserDto>>('https://localhost:7227/api/Admin/ListBlockedUsers',{params})
  }
}
