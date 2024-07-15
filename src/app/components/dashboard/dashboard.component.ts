import { Component, OnInit } from '@angular/core';
import { Project } from '../add-project/add-project.component';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projects: Project[] = [];
  paginatedProjects: Project[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4; // Adjust this number as needed
  totalPages: number[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getProjects();
  }

  async getProjects() {
    try {
      const resp = await this.apiService.getData('project');
      if (resp) {
        this.projects = resp.data;
        this.setupPagination();
      }
    } catch (err) {
      console.error('Error fetching data', err);
    }
  }

  setupPagination() {
    this.totalPages = Array(Math.ceil(this.projects.length / this.itemsPerPage))
      .fill(0)
      .map((_, i) => i + 1);
    this.paginateProjects();
  }

  paginateProjects() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProjects = this.projects.slice(start, end);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateProjects();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages.length) {
      this.currentPage++;
      this.paginateProjects();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.paginateProjects();
  }
}
