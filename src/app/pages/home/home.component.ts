import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  genderInput = '';
  genderSelected = false;

  genderOptions = [
    'Male',
    'Female'
  ]

  onGenderChange(e:any){
    this.genderInput = e.target.value;

    let gender = this.genderInput.toLowerCase();
    localStorage.setItem('userGender', gender);
  }

  next(){
    this.genderSelected = true;
  }
}
