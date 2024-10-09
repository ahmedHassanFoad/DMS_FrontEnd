import { Component } from '@angular/core';
import { DocumentService } from '../../document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  selectedFile?: File;
  dirId:number=0;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  constructor(private documentservice:DocumentService,private route:ActivatedRoute ,private router :Router){}
  onUploadFile(event: any) {
    event.preventDefault();
    if (this.selectedFile) {
      this.route.queryParams.subscribe(res=>{
        this.dirId=res['id'];
        
      })
     
      this.documentservice.uploadFile(this.selectedFile, this.dirId).subscribe(
        (response) => {
          alert('File uploaded successfully');
          this.router.navigateByUrl(`dir/${this.dirId}`)

        },
        (error) => {
          alert('File upload failed');
        }
      );
    }
  }

}
