import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://localhost:7116/api/Services';

  getAllServices(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?categoryId=${id}`);
  }

  searchServices(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?name=${name}`);
  }

  getMyServices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/myservices`);
  }

  getId(id: string): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id);
  }

  addService(service: any): Observable<any> {
    return this.http.post<Service>(this.apiUrl, service);
  }
  updateService(service: any): Observable<any> {
    return this.http.put<Service>(this.apiUrl, service);
  }
}
