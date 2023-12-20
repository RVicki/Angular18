import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async getUser() {
  const users = await fetch('http://localhost:3000/users')
  const data = await users.json(); //NOOIT VERGETEN JSON!
  return data;
  //Never put console.log after return!
  }
}
