import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'zodiacApp';
  inputName:string = '';
  inputDate: string = '';
  foundZodiac:string = '';
  displayedData: boolean = false;
  animalType:string = '';
  url:string = 'http://localhost:3000/zodiac'
  zodiacs:any[] = [];

  displayData() {
    this.displayedData = true;
    this.fetchMyData();
    this.findZodiac();
  }

  findZodiac() {
    if(this.inputDate) {
      const selectedYear = new Date(this.inputDate).getFullYear().toString();

      const foundZodiac = this.zodiacs.find(
        (zodiac) => zodiac.years.includes(selectedYear)
      );

      if(foundZodiac) {
        this.foundZodiac = foundZodiac.animal;
      } else {
        this.foundZodiac = 'Zodiac not found for this year';
      }
    } else {
      this.foundZodiac = 'Please select a valid date';
    }
  }

  postData() {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0'},
      body: JSON.stringify({
        'animal': this.animalType,
      })
    };

    fetch('http://localhost:3000/zodiac', options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.fetchMyData();
        this.animalType= '';
      })
      .catch(err => console.error(err));
  }

  fetchMyData() {
    fetch(this.url)
      .then(response => response.json())
      .then(json => this.zodiacs = json)
      .catch(err => console.error(err))
  }

  ngOnInit() { 

    this.fetchMyData();

  }
 
}
