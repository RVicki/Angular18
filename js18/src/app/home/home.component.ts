import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent { //always put everything in the class, not outside of it
  count:number = 0;
  title = 'Xmas Shopping';
  myContent:string = '';
  url:string = 'http://localhost:3000/todo';
  urlUsers:string = 'http://localhost:3000/users';
  todos:any[] = []; //it's available now
  users:any[] = [];
  user: any;

  increaseCount() {
    this.count++; //gebruik van 'this' verplicht want we zitten in een class!
    localStorage.setItem('count', this.count.toString());
  }
  DecreaseCount() {
    this.count--; //gebruik van 'this' verplicht want we zitten in een class!
    localStorage.setItem('count', this.count.toString());
  }


  postData() {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0'},
      body: JSON.stringify({
        'title': this.myContent,
        'owner': this.user,
        'done': false
      })
    };

    fetch('http://localhost:3000/todo', options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.fetchMyData();
        this.myContent = '';
      })
      .catch(err => console.error(err));
  }

  /* userNames = JSON.stringify(this.users); */
  
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

fetchMyUsers() {
  fetch(this.urlUsers)
  .then(response => response.json())
      .then(json => this.users = json)
}

  //al de gegevens in db.json invoegen! Moet erbij de volgende ngOnInit!
  ngOnInit() { 
    /* console.log('yay, my init works!')  --> test*/

    this.fetchMyData();
    this.fetchMyUsers();
  }

  
}
