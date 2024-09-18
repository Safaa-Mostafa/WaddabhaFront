// loading.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this._isLoading.asObservable();
  // getLoading(): boolean {
  //   return this._isLoading;
  // }
  startLoading(): void {
    this._isLoading.next(true);
  }
  stopLoading(): void {
    this._isLoading.next(false);
  }
}
