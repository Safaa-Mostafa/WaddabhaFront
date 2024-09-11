import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private urlPath = 'https://localhost:7116/api/Services';
  constructor(private http: HttpClient) {}
  
   addService () : Observable<any>{
    return this.http.post<Service>(this.urlPath , null)
   }
}
