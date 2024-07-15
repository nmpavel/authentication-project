import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { CkeditorWrapperComponent } from '../ckeditor-wrapper.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [FormsModule, CkeditorWrapperComponent, CommonModule],
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
  project: Project;

  constructor(private apiService: ApiService, private router: Router) {
    this.project = new Project();
  }

  validateForm(data: any) {
    const requiredFields = [
      { key: 'title', name: 'Title' },
      { key: 'shortDescription', name: 'Short Description' },
      { key: 'description', name: 'Description' }
    ];
    for (const attribute of requiredFields) {
      if (!data[`${attribute?.key}`]) {
        alert(`Please enter ${attribute?.name ? attribute?.name : attribute?.key}.`);
        return false;
      }
    }
    return true;
  }

  async onSubmit () {
    if(this.validateForm(this.project)){
      try {
        const res = await this.apiService.postProtectedData('project', this.project);
        if(res.statusCode===201){
          this.router.navigateByUrl("/dashboard");
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
  }

}

export class Project {
  title: string;
  shortDescription: string;
  description: string;

  constructor() {
    this.title = "";
    this.shortDescription = "";
    this.description = "";
  }
}
