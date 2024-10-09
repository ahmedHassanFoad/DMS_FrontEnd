import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserDto } from '../../../../core/auth/models/user.model';
import { CommonModule } from '@angular/common';
import { DriectoryDto } from '../../../Directory/directory.model';
import { DirectoryService } from '../../../Directory/directory.service';
import { UserService } from '../../../../core/services/user.service';
import { WorkSpaceDto } from '../../workspace.model';
import { WorkspaceService } from '../../workspace.service';
import { MatDialog } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
} from '@angular/forms';
import { PaginatorComponent } from "../../../../shared/components/paginator/paginator.component";
import { PaginatedResponse } from '../../../../shared/components/models/pagination-response.model';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, FormsModule, PaginatorComponent],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css',
})
export class WorkspaceComponent {
  myWorkSpace: WorkSpaceDto = { id: 0, name: '' };
  myDirectories: Array<DriectoryDto> = [];
  dirId: number = 0;
  total:number=0;
  page:number=1;
  limit:number=10;
  showAddPopUp: boolean = false;
  showEditPopUp: boolean = false;
  showDeletepopUp: boolean = false;
  totalCount: number = 0;
  pageSize: number = 7;
  currentPage: number = 1;
  searchTerm='';
  filterdDocuments:Array<DriectoryDto> = [];
  searchPage=1
  
  MyUser: UserDto = {
    id: 0,
    email: '',
    name: '',
    nid: '',
    phoneNumber: '',
    workSpaceID: 0,
    token: '',
    role: '',
    workSpaceName:''
  };
  addpopForm = new FormGroup({
    Name: new FormControl(''),
  });
  editpopForm = new FormGroup({
    Name: new FormControl(''),
    isPublic : new FormControl(false),
  });
  mydir: DriectoryDto = {
    name: '',
    id: 0,
    workSpaceId: this.myWorkSpace.id,
    isPublic: false,
  };
  constructor(
    private workSPaceS: WorkspaceService,
    private User: UserService,
    private directoryService: DirectoryService,
    private router:Router
  ) {}
  
  ngOnInit(): void {
    this.workSPaceS.getUserWorkSpace().subscribe((res: any) => {
      this.myWorkSpace = res as WorkSpaceDto;
      console.log('my workSpace', this.myWorkSpace);
    });
    this.User.getUser().subscribe((res) => {
      this.MyUser = res as UserDto;
    });

    this.workSPaceS.getUserDirectories(this.pageSize, this.currentPage)
    .subscribe((response: PaginatedResponse<DriectoryDto>) => {
      this.myDirectories = response.data;
      this.filterdDocuments = this.myDirectories;

      this.totalCount = response.count;
    });
  }
  onClickDelete(dir: DriectoryDto) {
    this.dirId = dir.id;
    this.showDeletepopUp = true;
  }
  onDeleteDir() {
    this.directoryService.deleteDir(this.dirId).subscribe((res: any) => {
      if (res == true) {
        this.workSPaceS.getUserDirectories(this.pageSize, this.currentPage)
        .subscribe((response: PaginatedResponse<DriectoryDto>) => {
          this.myDirectories = response.data;
          this.filterdDocuments = this.myDirectories;

          this.totalCount = response.count;
          this.closePop()
        });
      } else {
        return alert('error');
      }
    });
  }

  showAddPopup() {
    this.showAddPopUp = true;
  }
  showEditpopup(id: number) {
    this.dirId = id;
    this.showEditPopUp = true;
    this.directoryService.getDirById(this.dirId).subscribe((res) => {
      this.mydir = res as DriectoryDto;
      this.editpopForm.setValue({
        Name: this.mydir.name,
        isPublic: this.mydir.isPublic,
      });
      console.log('dir', this.mydir)
    });
    
  }
  showDeletepopup() {
    this.showDeletepopUp = true;
  }
  onChooseDir(dir: DriectoryDto) {
    this.router.navigateByUrl(`dir/${dir.id}`);
  }
  onAddNewDir() {
   
    const workspaceId = this.myWorkSpace.id;
    this.directoryService.addNewDir('', workspaceId).subscribe();
  }
  closePop() {
    this.showAddPopUp = false;
    this.showEditPopUp = false;
    this.showDeletepopUp = false;

    this.addpopForm.reset();
    this.editpopForm.reset();
  }
  add() {
    console.log('submit');
    this.directoryService
      .addNewDir(
        this.addpopForm.controls.Name.value as string,
        this.myWorkSpace.id
      )
      .subscribe((res) => {
        if (res) {
          this.showAddPopUp = false;
          this.workSPaceS.getUserDirectories(this.pageSize, this.currentPage)
          .subscribe((response: PaginatedResponse<DriectoryDto>) => {
            this.myDirectories = response.data;
            this.filterdDocuments = this.myDirectories;

            this.totalCount = response.count;
          });
        }
      });
  }

  update() {
    this.mydir.name = this.editpopForm.value.Name ?? ''; // Default to an empty string if Name is null/undefined
    this.mydir.isPublic = this.editpopForm.value.isPublic ?? false
    this.directoryService.editDir(this.mydir).subscribe((res) => {
      if (res) {
        console.log(alert('done'));
        this.workSPaceS.getUserDirectories(this.pageSize, this.currentPage)
        .subscribe((response: PaginatedResponse<DriectoryDto>) => {
          this.myDirectories = response.data;
          this.filterdDocuments = this.myDirectories;

          this.totalCount = response.count;
          this.closePop()
        });
      }
    });
    console.log('update');
  }
  onSearch(searchValue: string){
    
    this.searchTerm = searchValue
    if(this.searchTerm){
 
      this.directoryService.searchDirectories(this.searchTerm,  this.pageSize,this.searchPage).subscribe({
        next: (result) => {this.filterdDocuments = result.data as Array<DriectoryDto>
          this.totalCount = result.count;}
        ,
        error: (error)=> {
          this.filterdDocuments =[]
          console.log('error', error)
        }
      })
    }else{
      this.filterdDocuments = this.myDirectories;
    }
 
  }
  
  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.workSPaceS.getUserDirectories(this.pageSize, this.currentPage)
    .subscribe((response: PaginatedResponse<DriectoryDto>) => {
      this.myDirectories = response.data;
      this.filterdDocuments = this.myDirectories;

      this.totalCount = response.count;
    });
  }
}
