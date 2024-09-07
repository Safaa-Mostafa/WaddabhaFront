import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private urlPath = 'https://localhost:7116/api/Categories';
  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this.http.get<Category[]>(this.urlPath);
  }
}
