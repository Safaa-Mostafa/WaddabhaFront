import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContractAddDTO } from '../Models/contract';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:7116/api/contracts'; //

  addContract(contract: ContractAddDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, contract);
  }

  getAllContracts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(id: any): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id);
  }

  acceptContract(id: string): Observable<any> {
    return this.http.post(this.apiUrl + "/accept", { id });
  }

  rejectContract(id: string): Observable<any> {
    return this.http.post(this.apiUrl + "/reject", { id });
  }
}
