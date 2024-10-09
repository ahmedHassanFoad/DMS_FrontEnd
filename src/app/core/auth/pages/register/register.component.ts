import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { UserDto } from '../../models/user.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signupObj = {
    "email": "",
    "password": "",
    "name": "s",
    "nid": "",
    "phoneNumber": "",
    "workSpaceName": ""
  }
  
    constructor(private router:Router){
  
  
    }
  MyUser: UserDto = {
    id: 0,             
    email: '',
    name: '',
    nid: '',
    phoneNumber: '',
    workSpaceID: 0,
    token: '',
    role:'',
    workSpaceName:''
  };
  http=inject(HttpClient);
  onSignup(signupForm: any): void {
    if (signupForm.valid) {
      debugger;
      this.http.post("https://localhost:7227/api/Accounts/Register", this.signupObj).subscribe(
        (res: any) => {
          debugger;
          if (res.id) {
            alert("Signup successful!");
            this.MyUser = res as UserDto;
            localStorage.setItem("token", this.MyUser.token);
            this.router.navigateByUrl("/dashboard");
          } else {
            alert("Signup failed, please check your details.");
          }
        },
        (error) => {
          alert("An error occurred during signup. Please try again later.");
          console.error(error); // Log the error for debugging purposes
        }
      );
    } else {
      alert("Please fill in all required fields.");
    }
  }
onChooseLogin():void{
  this.router.navigateByUrl('login')
}
}
