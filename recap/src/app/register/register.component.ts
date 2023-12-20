import { Component } from '@angular/core';
import { UserService } from '../shared/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

    constructor(private userService: UserService) {}

    users:any;

    async ngOnInit() {
      this.users = await this.userService.getUser();
    }
}
