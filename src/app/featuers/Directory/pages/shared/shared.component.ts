import { Component, OnInit } from '@angular/core';
import { DirectoryService } from '../../directory.service';
import { DriectoryDto } from '../../directory.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PaginatedResponse } from '../../../../shared/components/models/pagination-response.model';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';

@Component({
  selector: 'app-shared',
  standalone: true,
  imports: [CommonModule, PaginatorComponent],
  templateUrl: './shared.component.html',
  styleUrl: './shared.component.css',
})
export class SharedComponent implements OnInit {
  constructor(private dirService: DirectoryService, private router: Router) {}
  SharedDirs: Array<DriectoryDto> = [];
  totalCount: number = 0;
  pageSize: number = 7;
  currentPage: number = 1;

  ngOnInit(): void {
    this.dirService
      .getSahredDirectories(this.pageSize, this.currentPage)
      .subscribe((response: PaginatedResponse<DriectoryDto>) => {
        this.SharedDirs = response.data;
        this.totalCount = response.count;
      });
  }
  onChooseDir(dir: DriectoryDto) {
    this.router.navigateByUrl(`SharedDocs/${dir.id}`);
  }
  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.dirService
      .getSahredDirectories(this.pageSize, this.currentPage)
      .subscribe((response: PaginatedResponse<DriectoryDto>) => {
        this.SharedDirs = response.data;
        this.totalCount = response.count;
      });
  }
}
