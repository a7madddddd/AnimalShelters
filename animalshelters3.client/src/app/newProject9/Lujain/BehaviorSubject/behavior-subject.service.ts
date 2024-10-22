import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviorSubjectService {

  private userId: BehaviorSubject<string> = new BehaviorSubject<string>("");

  userId$ = this.userId.asObservable();

  constructor() { }


  setUserId(userId: string) {
    this.userId.next(userId); 
  }



}
