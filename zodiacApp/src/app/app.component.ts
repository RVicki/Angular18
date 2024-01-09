import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

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
  imagePath: any;

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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
  
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = btoa(reader.result as string);
      this.uploadImage(base64String);
    };
    reader.readAsBinaryString(file);
  }
  
  uploadImage(base64String: string) {
    // Implementation to send the base64 string to your API.
  }

  constructor(private sanitizer: DomSanitizer) {}

sanitizeImage(base64String: string) {
  this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64,${base64String}`);
}
 
}
