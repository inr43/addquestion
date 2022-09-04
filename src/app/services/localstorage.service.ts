import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setKey(data) {
    localStorage.setItem('questionKey', data);
  }

  getKey(): string {
    return localStorage.getItem('questionKey')
  }

  removeKey() {
    localStorage.removeItem('questionKey');
  }

}
