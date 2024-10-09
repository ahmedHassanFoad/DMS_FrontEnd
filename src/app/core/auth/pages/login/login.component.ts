import { Component, Input, input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../../models/user.model';
import { loginObj } from '../../models/login.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  @Input() email: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private autahntication: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
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

  loginData: loginObj = {
    email: '',
    password: '',
  };
  onsiginupClicked() {
    this.router.navigateByUrl('signup');
  }
  onLogin() {
    
    this.autahntication
      .handelLogin(this.loginForm.value)
      .subscribe((res: any) => {
        if (res.id) {
          this.MyUser = res as UserDto;
          if (this.MyUser.role ==='Admin'){
            this.router.navigate(['adminDashBoard']);
          }
          else{
            this.router.navigate(['/workspace']);
          }         
         
          
        } else {
          alert('check Email or password');
        }
      });
      
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      
    }
    else {
      alert('enter Email and password')
    }
  }
}
