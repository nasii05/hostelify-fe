import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {

  }

  onLogin(){
    if(this.email && this.password){
      this.authService.login(this.email, this.password).subscribe({
        next: (res:any) =>{
          console.log('Sign Up Successful', res);
          if(res?.success){
            this.router.navigate(['home']);
            this.showSuccess(res?.message);
          }else{
            this.showError(res?.message)
          }
        },
        error: (err) => {
          console.log(err);
          this.showError(err.message || "Invalid Credentials");
        },
        complete: () => {
          console.log('Sign In request complete');
        }
      })
    }else{
      this.showError('Please fill the data')
    }
  }

  showSuccess(message: string) {
    this.toast.success(message);
  }

  showError(message: string){
    this.toast.error(message);
  }
}
