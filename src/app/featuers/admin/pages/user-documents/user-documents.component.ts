import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../../Document/document.service';
import { DirectoryService } from '../../../Directory/directory.service';
import { DocumentDto } from '../../../Document/document.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-documents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-documents.component.html',
  styleUrl: './user-documents.component.css',
})
export class UserDocumentsComponent implements OnInit{
  constructor(private docservice: DocumentService,private router: Router,private route: ActivatedRoute,){}
  showDeletepopUp: boolean = false;  
  dirId: number = 0;
  myDocuments: Array<DocumentDto> = [];
  docId: number = 0;
  workSpaceId:number=0
  ngOnInit(): void {
   this.workSpaceId = Number(this.route.snapshot.paramMap.get('id'));
    this.docservice.getDocumentsByWorkSpaceId(this.workSpaceId).subscribe(res=>{
      this.myDocuments=res as Array<DocumentDto>
    })
  }
  onClickDelete(doc: DocumentDto) {
    this.docId = doc.id;
    this.showDeletepopUp = true;
  }
  onDeleteDir() {
    this.docservice.deleteDocument(this.docId);
  }
 
  onChooseUpload() {
    this.router.navigate([`file-Upload`], { queryParams: { id: this.dirId } });
  }
  showDeletepopup() {
    this.showDeletepopUp = true;
  }
  deleteDocument() {
    this.docservice.deleteDocument(this.docId).subscribe((res: any) => {
      if (res == true) {
        this.myDocuments = this.myDocuments.filter((d) => d.id !== this.docId);
        this.closePop();
      } else {
        return alert('error');
      }
    });
  }
  previewDocument(documentId: number) {
    this.docservice.previewDocument(documentId).subscribe(
      (url: string) => {
        if (url !== 'invalid Id') {
          // Open the URL in a new tab to preview the document
          window.open(url, '_blank');
        } else {
          console.error('Invalid Document ID');
          alert('Document not found or invalid document ID.');
        }
      },
      (error) => {
        console.error('Error fetching the document preview', error);
      }
    );
  }
  downloadFile(doc: DocumentDto) {
    this.docservice.downloadDocument(doc.id).subscribe(
      (blob: Blob) => {
        // Create a URL for the blob and download the file
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = doc.name; // You can change the filename here
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url); // Clean up
      },
      (error) => {
        console.error('Error downloading the file', error);
      }
    );
  }
  closePop() {
    this.showDeletepopUp = false;
  }
}
