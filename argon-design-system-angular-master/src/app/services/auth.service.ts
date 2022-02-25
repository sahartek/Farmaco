import { Injectable } from '@angular/core';
import{ SERVER_API_URL } from '../app.constante';
import  { Login }   from '../models/user';
import { HttpClient, HttpResponse , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  loggedIn = false;
 
  constructor(private http : HttpClient   ) {
      
   }

   
  getUserData(token)  {
    
    this.http.get(SERVER_API_URL + '/user/', { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) }).subscribe(
        (response:any) => {
          console.log(response);
          
          localStorage.removeItem('user');
          localStorage.setItem('user',  JSON.stringify(response));
          console.log(response.type);
          if(response.type ==  "2"){
            //console.log("looool");

            
            this.http.get(SERVER_API_URL + '/user/bureau', { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) }).subscribe(
              (response: Login) => {
                console.log(response);
                
                localStorage.removeItem('bureau');
                localStorage.setItem('bureau',  JSON.stringify(response));
              });
          }
          return true;
        
  
        });
  }

  login (data:any) : Observable<any> {
    return this.http.post(SERVER_API_URL + "/login" , data);
  }

  register (data:any) : Observable<any> {
    return this.http.post(SERVER_API_URL + "/register" , data);
  }


  deleteUser(data:any): Observable<any>{
    return this.http.delete(SERVER_API_URL+ "/user/" + data ); 
  }

 
}