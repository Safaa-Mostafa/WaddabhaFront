import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http : HttpClient) { }
  private apiUrl = "https://localhost:7116/api/Services";

  getAllServices() : Observable<any>{
    return this.http.get(this.apiUrl);
  }

}
