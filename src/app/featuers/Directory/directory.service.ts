import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DriectoryDto } from './directory.model';
import { PaginatedResponse } from '../../shared/components/models/pagination-response.model';
import { DocumentDto } from '../Document/document.model';

@Injectable({
  providedIn: 'root',
})
export class DirectoryService {
  constructor() {}
  http = inject(HttpClient);

  getDocumentByDirId(directoryId: number, pageSize: number, pageNumber: number): Observable<PaginatedResponse<DocumentDto>> {
    const params = new HttpParams()
      .set('directoryId', directoryId.toString())
      .set('pageSize', pageSize.toString())
      .set('pageNumber', pageNumber.toString());

    return this.http.get<PaginatedResponse<DocumentDto>>(`https://localhost:7227/api/Document/GetByDirectoryId`, { params });
  
  }
  deleteDir(id: number): Observable<any> {
    return this.http.delete(
      `https://localhost:7227/api/Directory/SoftDeletDirectoryId?directoryId=${id}`
    );
  }
  addNewDir(name: string, workspaceId: number): Observable<any> {
    const directory: { name: string; workSapceId: number } = {
      name: name,
      workSapceId: workspaceId,
    };
    let params = new HttpParams()
      .set('name', name)
      .set('workSapceId', workspaceId.toString());
    console.log(name, workspaceId);
    return this.http.post(
      'https://localhost:7227/api/Directory/newDir',
      {},
      { params: params }
    );
  }
  editDir(dir: DriectoryDto) {
    debugger;
    return this.http.put('https://localhost:7227/api/Directory/updateDir', dir);
  }
  getDirById(id: number): Observable<any> {
    return this.http.get(`https://localhost:7227/api/Directory/directoryById?id=${id}`);
  }
  getDirsByUserId(id:number):Observable<any>{
    return this.http.get(`https://localhost:7227/api/Directory/byuserId?id=${id}`)
  }
  getSahredDirectories(pageSize: number, pageNumber: number): Observable<PaginatedResponse<DriectoryDto>> {
    const params = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('pageNumber', pageNumber.toString());

    return this.http.get<PaginatedResponse<DriectoryDto>>(`https://localhost:7227/api/Directory/sharedDirectories?`, { params });
  }
  searchDocument(filter:string,pageSize: number, pageNumber: number):Observable<PaginatedResponse<DocumentDto>>{
    const params = new HttpParams()
      .set('filter',filter)
      .set('pageSize', pageSize.toString())
      .set('pageNumber', pageNumber.toString());
      return this.http.get<PaginatedResponse<DocumentDto>>('https://localhost:7227/api/Document/searchByName?',{params})
  }
  searchDirectories(filter:string,pageSize: number, pageNumber: number):Observable<PaginatedResponse<DriectoryDto>>{
    const params = new HttpParams()
      .set('filter',filter)
      .set('pageSize', pageSize.toString())
      .set('pageNumber', pageNumber.toString());
      return this.http.get<PaginatedResponse<DriectoryDto>>('https://localhost:7227/api/Directory/searchByName?',{params})
  }
}

