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
  owner:string = '';

  increaseCount() {
    this.count++; //gebruik van 'this' verplicht want we zitten in een class!
    localStorage.setItem('count', this.count.toString());
  }


  postData() {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0'},
      body: JSON.stringify({
        'title': this.myContent,
        'owner': this.owner,
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


  //al de gegevens in db.json invoegen! Moet erbij de volgende ngOnInit!
  ngOnInit() { 
    /* console.log('yay, my init works!')  --> test*/

    this.fetchMyData();
  }

  
}
