import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title:string = 'recap of our angular course';
  name:string = '';
  myElements:Array<any> = [
    {name: 'Suzie', id: 1},
    {name: 'Bart', id: 2},
    {name: 'Leo', id: 3}

  ];

  methodName() {
    console.log('hello');
  }
}
