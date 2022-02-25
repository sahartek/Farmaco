import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; 
import { FormBuilder , FormGroup } from '@angular/forms';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
    focus2;
    focus3;
    focus4;
    public registerForm!: FormGroup;
    public loading = false;
    public success = false; 
    public error = false;
    public show = false;

    constructor(private AuthService : AuthService , private fb : FormBuilder) { }

    ngOnInit() {
        this.registerForm = this.fb.group({
            'name' : '',
            'email': '',
            'adress': '',
            'phone' : '',
            'password' : '',
          });
    }

    add(){
        this.loading = true;
        var formData = new FormData();
        formData.append("name", this.registerForm.get('name').value);
        formData.append("email", this.registerForm.get('email').value);
        formData.append("adress", this.registerForm.get('adress').value);
        formData.append("phone", this.registerForm.get('phone').value);
        formData.append("password", this.registerForm.get('password').value);
    
        this.AuthService.register(formData).subscribe((response : any) => {
          this.loading = false;
         // console.log(response);
          if ( response.message == "success" ){
            this.success = true; 
            this.error = false; 
          }else{
            this.success = false; 
            this.error = true; 
          }
        } , 
        (error : any) => {
          this.success = false; 
          this.loading = false;
          this.error = true; 
        }) ; 
      }
}
