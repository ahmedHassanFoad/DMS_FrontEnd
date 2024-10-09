import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DirectoryService } from '../../directory.service';
import { WorkspaceService } from '../../../WorkSpace/workspace.service';
import { DocumentDto } from '../../../Document/document.model';
import { DocumentService } from '../../../Document/document.service';
import { PrimeIcons } from 'primeng/api';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { PaginatedResponse } from '../../../../shared/components/models/pagination-response.model';
import { PaginatorComponent } from "../../../../shared/components/paginator/paginator.component";

@Component({
  selector: 'app-directory',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule, ReactiveFormsModule, PaginatorComponent],
  templateUrl: './directory.component.html',
  styleUrl: './directory.component.css',
})
export class DirectoryComponent implements OnInit {
  constructor(
    private router: Router,
    private directoryService: DirectoryService,
    private workspaceservice: WorkspaceService,
    private route: ActivatedRoute,
    private docservice: DocumentService,
    private datePipe: DatePipe
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
  showDeletepopUp: boolean = false;
  showEditpopUp: boolean = false;
  totalCount: number = 0;
  pageSize: number = 3;
  currentPage: number = 1;
  editpopForm = new FormGroup({
    Name: new FormControl(''),
  });
  searchTerm='';
  filterdDocuments:Array<DocumentDto>=[]
  searchPage=1;
  onSearch(searchValue: string){
    
    this.searchTerm = searchValue
    if(this.searchTerm){
 
      this.directoryService.searchDocument(this.searchTerm,  this.pageSize,this.searchPage).subscribe({
        next: (result) => {this.filterdDocuments = result.data as Array<DocumentDto>
          this.totalCount = result.count;}
        ,
        error: (error)=> {
          this.filterdDocuments =[]
          console.log('error', error)
        }
      })
    }else{
      this.filterdDocuments = this.myDocuments;
    }
 
  }


  ngOnInit(): void {
    this.dirId = Number(this.route.snapshot.paramMap.get('id'));

    this.directoryService
      .getDocumentByDirId(this.dirId, this.pageSize, this.currentPage)
      .subscribe((response: PaginatedResponse<DocumentDto>) => {
        this.myDocuments = response.data;
        this.filterdDocuments=this.myDocuments
        this.totalCount = response.count;
      });
  }
  formatDate(isoDate: Date): string | null {
    if (!isoDate) {
      return null; // Return a default value or handle nulls appropriately
    }
    return this.datePipe.transform(isoDate, 'dd/MM/yy');
  }

  onChooseDoeument() {
    this.router.navigate(['Document']);
  }
  onChooseUpload() {
    this.router.navigate([`file-Upload`], { queryParams: { id: this.dirId } });
  }
  showDeletepopup() {
    this.showDeletepopUp = true;
  }
  onClickDelete(doc: DocumentDto) {
    this.docId = doc.id;
    this.showDeletepopUp = true;
  }
  onDeleteDir() {
    this.docservice.deleteDocument(this.docId);
  }
  onDeleteDocument(doc: DocumentDto) {
    this.docservice.deleteDocument(doc.id);
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
  deleteDocument() {
    this.docservice.deleteDocument(this.docId).subscribe((res: any) => {
      if (res == true) {
        this.myDocuments = this.myDocuments.filter((d) => d.id !== this.docId);
        this.filterdDocuments=this.myDocuments
        this.closePop();
      } else {
        return alert('error');
      }
    });
  }
  showEditpopup(id: number) {
    this.docId = id;
    this.showEditpopUp = true;
    this.docservice.getDocumentById(this.docId).subscribe((res) => {
      this.myDocument = res as DocumentDto;
    });
    this.editpopForm.setValue({
      Name: this.myDocument.name,
    });
  }
  closePop() {
    this.showEditpopUp = false;
    this.showDeletepopUp = false;
    this.editpopForm.reset();
  }
  update() {
    this.myDocument.name = this.editpopForm.value.Name ?? ''; // Default to an empty string if Name is null/undefined

    this.docservice.editDocument(this.myDocument).subscribe((res) => {
      if (res) {
        console.log(alert('done'));
        this.dirId = Number(this.route.snapshot.paramMap.get('id'));
        this.directoryService
          .getDocumentByDirId(this.dirId, this.pageSize, this.currentPage)
          .subscribe((response: PaginatedResponse<DocumentDto>) => {
            this.myDocuments = response.data;
            this.filterdDocuments=this.myDocuments
            this.totalCount = response.count;
            this.closePop();
          });
      }
    });
    console.log('update');
  }
  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.directoryService
      .getDocumentByDirId(this.dirId, this.pageSize, this.currentPage)
      .subscribe((response: PaginatedResponse<DocumentDto>) => {
        this.myDocuments = response.data;
        this.filterdDocuments=this.myDocuments
        this.totalCount = response.count;
      });
  }
}
