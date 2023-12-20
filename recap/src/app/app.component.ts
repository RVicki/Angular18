import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private userService: UserService) {} 

  title:string = 'recap of our angular course';
  name:string = '';
  users:any;
  myElements:Array<any> = [
    {name: 'Suzie', id: 1},
    {name: 'Bart', id: 2},
    {name: 'Leo', id: 3}

  ];

  methodName() {
    console.log('hello');
  }

  async ngOnInit() {
    this.users = await this.userService.getUser();
  }
}
