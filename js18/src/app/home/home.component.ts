import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  count:number = 0;
  title = 'Xmas Shopping';

  myContent:string = '';

  increaseCount() {
    this.count++; //gebruik van 'this' verplicht want we zitten in een class!
  }
}
