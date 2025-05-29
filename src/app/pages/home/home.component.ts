import { Component } from '@angular/core';

interface User {
  email: string,
  id: string,
  name: string;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {
  searchTerm = '';

  genderInput = '';
  genderSelected = false;
  currentUser: User | null = null;

  genderOptions = [
    'Male',
    'Female'
  ]

  onGenderChange(e: any) {
    this.genderInput = e.target.value;

    let gender = this.genderInput.toLowerCase();
    localStorage.setItem('userGender', gender);
  }

  next() {
    this.genderSelected = true;

    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const parsed = JSON.parse(userData);
      this.currentUser = parsed.user as User;
      console.log(this.currentUser);
    }
  }

}
