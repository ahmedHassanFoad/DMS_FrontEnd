import { CommonModule } from '@angular/common';
import { UserDto } from '../../../../core/auth/models/user.model';
import { AdminService } from './../../admin.service';
import { Component, OnInit } from '@angular/core';
import { PaginatedResponse } from '../../../../shared/components/models/pagination-response.model';
import { PaginatorComponent } from "../../../../shared/components/paginator/paginator.component";

@Component({
  selector: 'app-panned-users',
  standalone: true,
  imports: [CommonModule, PaginatorComponent],
  templateUrl: './panned-users.component.html',
  styleUrl: './panned-users.component.css'
})
export class PannedUsersComponent implements OnInit{
  blockedUsers:Array<UserDto>=[]
  totalCount: number = 0;
  pageSize: number = 5; // Set your default page size
  currentPage: number = 1;
  constructor(private adminService:AdminService){}
  ngOnInit(): void {
    this.adminService.listAllBlockedUsers(this.pageSize, this.currentPage).subscribe((response: PaginatedResponse<UserDto>) => {
      this.blockedUsers = response.data;
      this.totalCount = response.count;
    });
  }
  onClickUnLock(id:number){
    this.adminService.UnlockUser(id).subscribe(res=>{
      this.adminService.listAllBlockedUsers(this.pageSize, this.currentPage).subscribe((response: PaginatedResponse<UserDto>) => {
        this.blockedUsers = response.data;
        this.totalCount = response.count;
      });
    })
  }
  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.adminService.listAllBlockedUsers(this.pageSize, this.currentPage).subscribe((response: PaginatedResponse<UserDto>) => {
      this.blockedUsers = response.data;
      this.totalCount = response.count;
    }); // Reload users for the new page
  }
}
