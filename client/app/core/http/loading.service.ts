import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading = false;

  constructor() {
  }

  /** 是否在加载中 */
  get loading(): boolean {
    return this._loading;
  }

  begin() {
    setTimeout(() => (this._loading = true));
  }

  end() {
    setTimeout(() => (this._loading = false));
  }
}
