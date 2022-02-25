import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; 
import { FormBuilder , FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  public loginForm!: FormGroup;
  public loading = false;
  public success = false; 
  public error = false;
  public show = false;
  constructor(private AuthService : AuthService , private router: Router, private fb : FormBuilder) { }

  ngOnInit() {
      this.loginForm = this.fb.group({
          'email': '',
          'password' : '',
        });
  }

  login(){
    this.loading = true;
    var formData = new FormData();
    formData.append("email", this.loginForm.get('email').value);
    formData.append("password", this.loginForm.get('password').value);

    this.AuthService.login(formData).subscribe((response : any) => {
      this.loading = false;
     // console.log(response);
        this.success = true; 
        this.error = false; 
        if( response.access_token != "0" ){
          localStorage.removeItem('token');
          localStorage.setItem('token', response.access_token);
          this.loading = false;
          this.router.navigate(['/home']);

        }

    } , 
    (error : any) => {
      this.success = false; 
      this.loading = false;
      this.error = true; 
    }) ; 
  }
}
