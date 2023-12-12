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
  xmasbudget = 600;
  count:number = 0;
  title = 'Xmas Shopping';
  myContent:string = '';
  priceItem:number = 0;
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
        'done': false,
        'price': this.priceItem,
      })
    };

    fetch('http://localhost:3000/todo', options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.fetchMyData();
        this.myContent = '';
        this.user = '';
        this.priceItem = 0;
      })
      .catch(err => console.error(err));
  }

  toggleDone(todo: any) {
    const originalStatus = todo.done;

    todo.done = !todo.done;
    this.updateTodoStatus(todo);

    const priceDifference = originalStatus ? todo.price : -todo.price;
    this.xmasbudget += priceDifference;

    localStorage.setItem('xmasbudget', JSON.stringify(this.xmasbudget));
  }

  updateTodoStatus(todo: any) {
    const options = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.4.5'}, 
      body: JSON.stringify(todo)
    };
    
    fetch('http://localhost:3000/todo/'+todo.id, options)
      .then(response => response.json())
      .then(response => console.log(response))
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

deleteTodo(id: number) {
  console.log (id)
  const options = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0'}
  };
  
  fetch('http://localhost:3000/presents/'+id, options)
    .then(response => response.json())
    .then(response => {
      this.fetchMyData();
    })
    .catch(err => console.error(err));
}

  //al de gegevens in db.json invoegen! Moet erbij de volgende ngOnInit!
  ngOnInit() { 

    this.fetchMyData();
    this.fetchMyUsers();

    const storedCount = localStorage.getItem('count');
   this.count = storedCount !== null ? parseInt(storedCount) : 0;

  }
}