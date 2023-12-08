import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent { //always put everything in the class, not outside of it
  count:number = 0;
  title = 'Xmas Shopping';
  myContent:string = '';
  url:string = 'http://localhost:3000/todo';
  todos:any[] = []; //it's available now

  increaseCount() {
    this.count++; //gebruik van 'this' verplicht want we zitten in een class!
  }
  
/* fetchMyData() {
  fetch(this.url)
  .then(response => response.json())
  .then(json => console.log(json))
} 

Underneath is the next step after adding url:string ... above under class*/

  fetchMyData() {
  fetch(this.url)
  .then(response => response.json())
  .then(json => this.todos = json)
}

  //al de gegevens in db.json invoegen! Moet erbij de volgende ngOnInit!
  ngOnInit() { 
    /* console.log('yay, my init works!')  --> test*/

    this.fetchMyData();
  }
}
