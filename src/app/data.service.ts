import { Injectable } from '@angular/core';
import { User } from './user.model';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private selectedUserSubject = new BehaviorSubject<User | null>(null);
  selectedUser$ = this.selectedUserSubject.asObservable();

  constructor() {}

  notifyUserSelected(user: User): void {
    this.selectedUserSubject.next(user);
  }

  notifyUserAddedOrUpdated(user: User): void {
    this.selectedUserSubject.next(user);
  }
}
