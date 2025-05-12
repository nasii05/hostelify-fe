import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {

  name = '';
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ){

  }


  onSignUp(){
    this.authService.signUp(this.name, this.email, this.password).subscribe({
      next: (res:any) => {
        console.log('Sign up Successful', res);
        if(res?.success){
          this.router.navigate(['home']);
          this.showSuccess(res?.message)
        }else{
          this.showError(res?.message)
        }
      },
      error: (err) => {
        console.log(err)
        this.showError(err.message);
      },
      complete: () =>{
        console.log('Signup requst complete')
      }
    })
  }


  showSuccess(message: string) {
    this.toast.success(message);
  }

  showError(message: string){
    this.toast.error(message);
  }
  
}
