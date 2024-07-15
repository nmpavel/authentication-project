import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { validateEmail } from '../../utils/validation';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userObj: User;
  constructor(private apiService: ApiService, private router: Router){
    this.userObj = new User();
  }
  validateForm (data: any) {
		const requiredFields = [{ key: 'email', name: 'email' },{ key: 'password', name: 'password' }]
		for (const attribute of requiredFields) {
			if (!data[`${attribute?.key}`]) {
				alert(`Please enter ${attribute?.name ? attribute?.name : attribute?.key}.`);
				return false;
			}
		}
		if (!validateEmail(data?.email)) {
			alert(`Please enter a correct email address.`);
			return false;
		}
		return true
	}
  async onLogin () {
    if(this.validateForm(this.userObj)){
      try {
        const res = await this.apiService.postData('auth/login', this.userObj);
        if(res.token){
          this.router.navigateByUrl("/dashboard");
          localStorage.setItem("token",res.token);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
  }
}

export class User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userType: string;
  constructor(){
    this.firstName ="",
    this.lastName="",
    this.email="",
    this.password="",
    this.phone="",
    this.userType="admin"
  }
}
