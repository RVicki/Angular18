import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  password:any;
  username:any;

  constructor (private userService:UserService) {}

  onSubmit() {

    this.userService.register(this.username, this.password);
  }

  
}
