import { DirectoryService } from './../../../Directory/directory.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { UserDto } from '../../../../core/auth/models/user.model';
import { WorkspaceService } from '../../../WorkSpace/workspace.service';
import { Router } from '@angular/router';
import { PaginatorComponent } from "../../../../shared/components/paginator/paginator.component";
import { PaginatedResponse } from '../../../../shared/components/models/pagination-response.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, PaginatorComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private DirectoryService: DirectoryService,
    private WorkSpaceService: WorkspaceService,
    private router: Router
  ) {}
  totalCount: number = 0;
  pageSize: number = 5; // Set your default page size
  currentPage: number = 1;
  Users: Array<UserDto> = [];
  ngOnInit(): void {
    this.adminService.listAllUsers(this.pageSize, this.currentPage).subscribe((response: PaginatedResponse<UserDto>) => {
      this.Users = response.data;
      this.totalCount = response.count;
  });
  
  }
  onClickWorkSpace(user:UserDto): void {
    this.router.navigate([`UserDocuments/${user.id}`]);
  }
  
  onClickLock(id: number) {
    this.adminService.lockUser(id).subscribe(
      (response) => {
        this.adminService.listAllUsers(this.pageSize, this.currentPage).subscribe((response: PaginatedResponse<UserDto>) => {
          this.Users = response.data;
          this.totalCount = response.count;
      });
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }

  goToPrevious():void{
    console.log("Previous button clicked" )
  }
  goToNext():void{
    console.log("Next button clicked" )
  }
  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.adminService.listAllUsers(this.pageSize, this.currentPage).subscribe((response: PaginatedResponse<UserDto>) => {
      this.Users = response.data;
      this.totalCount = response.count;
  });
  }
}
