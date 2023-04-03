import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  constructor() { }

  canView(componentName: string, currentUser: any): Boolean {
    // return true;

    if (currentUser.token.views && currentUser.token.views.includes(componentName)) {
      return true;
    } else {
      return false;
    }
  }
}
