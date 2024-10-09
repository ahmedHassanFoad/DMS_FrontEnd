import { Component, OnInit } from '@angular/core';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { CommonModule } from '@angular/common';
import { DocumentDto } from '../../document.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../../document.service';
import { DirectoryService } from '../../../Directory/directory.service';
import { PaginatedResponse } from '../../../../shared/components/models/pagination-response.model';

@Component({
  selector: 'app-shared-documents',
  standalone: true,
  imports: [PaginatorComponent, CommonModule],
  templateUrl: './shared-documents.component.html',
  styleUrl: './shared-documents.component.css',
})
export class SharedDocumentsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private docservice: DocumentService,
    private router: Router,
    private directoryService: DirectoryService
  ) {}
  myDocument: DocumentDto = {
    id: 0,
    name: '',
    version: '',
    type: '',
    owner: '',
    path: '',
    date: new Date(),
  };
  dirId: number = 0;
  myDocuments: Array<DocumentDto> = [];
  docId: number = 0;
  totalCount: number = 0;
  pageSize: number = 7;
  currentPage: number = 1;
  ngOnInit(): void {
    this.dirId = Number(this.route.snapshot.paramMap.get('id'));

    this.directoryService
      .getDocumentByDirId(this.dirId, this.pageSize, this.currentPage)
      .subscribe((response: PaginatedResponse<DocumentDto>) => {
        this.myDocuments = response.data;
        this.totalCount = response.count;
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
  onPageChange(newPage: number): void {
    this.currentPage = newPage;
  }
}
