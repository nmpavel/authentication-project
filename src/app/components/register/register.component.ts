import { Component } from '@angular/core';
import { User } from '../login/login.component';
import { ApiService } from '../../api.service';
import { validateEmail } from '../../utils/validation';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userObj: User;
  constructor(private apiService: ApiService, private router:Router){
    this.userObj = new User();
  }
  validateForm (data: any) {
		const requiredFields = [{ key: 'email', name: 'email' },{ key: 'password', name: 'password' },{ key: 'firstName', name: 'first name' },{ key: 'lastName', name: 'last name' }]
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
  async onRegister () {
    if(this.validateForm(this.userObj)){
      try {
        const res = await this.apiService.postData('auth/register', this.userObj);
        console.log(res)
        if(res.statusCode===201){
          this.router.navigateByUrl("/dashboard");
          localStorage.setItem("token",res.data.token);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
  }
}
