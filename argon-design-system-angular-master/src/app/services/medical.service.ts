import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{ SERVER_API_URL } from '../app.constante';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Medical } from '../models/medical';

@Injectable({
  providedIn: 'root'
})
export class MedicalService {

  auth_token = localStorage.getItem('token');
  
  headers = new HttpHeaders({
    'Accept': 'application/json',
    'Authorization': `Bearer ${this.auth_token}`
  })

  constructor(private http :HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getMediclas(): Observable <Array<Medical>>{
    return this.http.get<Array<Medical>>(SERVER_API_URL+ 'medical')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  // addEvents(data:any): Observable<any>{
  //   return this.http.post(SERVER_API_URL + 'medical/add', data  , { headers: this.headers } );
  // }

  // updateEvents(data:any , id:any): Observable<any>{
  //   return this.http.post(SERVER_API_URL + 'event/update/' + id , data , id );
  // }

  // getArchives(): Observable<Array<Medical>>{
  //   return this.http.get<Array<Medical>>(SERVER_API_URL + 'event/')
  //   .pipe(catchError(this.processHTTPMsgService.handleError));
  // }

  // deleteEvent(data:any): Observable<any>{
  //   return this.http.delete(SERVER_API_URL + "event/" + data ); 
  // }

}
