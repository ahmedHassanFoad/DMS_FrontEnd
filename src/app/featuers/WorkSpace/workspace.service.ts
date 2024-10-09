import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../../shared/components/models/pagination-response.model';
import { DriectoryDto } from '../Directory/directory.model';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  constructor() {}
  http = inject(HttpClient);
  getWorkSpacesList(): Observable<any> {
    return this.http.get('https://localhost:7227/api/WorkSpaceCotroller');
  }
  getUserWorkSpace(): Observable<any> {
    return this.http.get(
      'https://localhost:7227/api/WorkSpaceCotroller/GetUserWorkSPace'
    );
  }
  getUserDirectories(pageSize: number, pageNumber: number): Observable<PaginatedResponse<DriectoryDto>> {
    const params = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('pageNumber', pageNumber.toString());

    return this.http.get<PaginatedResponse<DriectoryDto>>(`https://localhost:7227/api/Directory/ByUser`, { params });
  }
  
  
}
