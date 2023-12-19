import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private  userService:  UserService) { }

	// Let's go wild and write some async sh!t
	async onSubmit() {
		const  token  =  await this.userService.login(this.username, this.password);
		if (token) {
			// Store token in local storage
			localStorage.setItem('token', token);
			// Redirect to protected component
			// ...
			} else {
				alert('Invalid username or password');
			}
		}

// logout method
	logout() {
	localStorage.removeItem('token');
	}
}
