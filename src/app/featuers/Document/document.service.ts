import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentDto } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
 

  uploadFile(file: File, directoryId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('directoryId', directoryId.toString());

    return this.http.post('https://localhost:7227/api/Document/Upload', formData);
  }
  deleteDocument(id: number): Observable<any> {
   return this.http.delete(
      `https://localhost:7227/api/Document/softDeleteById?id=${id}`
    );
  }
  previewDocument(documentId: number): Observable<string> {
    return this.http.get(
      `https://localhost:7227/api/Document/Preview?DocumentId=${documentId}`,
      { responseType: 'text' }
    );
  }
  downloadDocument(documentId: number): Observable<any> {
    // Set responseType to 'blob' to handle file response
    return this.http.get(
      `https://localhost:7227/api/Document/Download?documentId=${documentId}`,
      { responseType: 'blob' }
    );
  }
   getDocumentById(id:number):Observable<any>{
    return this.http.get(`https://localhost:7227/api/Document/GetDocumentById?Id=${id}`)
   }
 editDocument(Doc:DocumentDto):Observable<any>{
  return this.http.put('https://localhost:7227/api/Document/UpdateDocument',Doc)
 }
 getDocumentsByWorkSpaceId(id:number):Observable<any>{
  return this.http.get(`https://localhost:7227/api/Document/GetByWorkSpaceId?workSpaceId=${id}`)
 }
 
}
