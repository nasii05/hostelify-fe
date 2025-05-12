import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/api';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: any;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    const storedUser = this.isBrowser
      ? JSON.parse(localStorage.getItem('currentUser') || 'null')
      : null;

    this.currentUserSubject = new BehaviorSubject<any>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Get current user
  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  // Sign Up
  signUp(name: string, email: string, password: string) {
    const body = { name, email, password };
    return this.http.post<any>(`${this.apiUrl}/register`, body).pipe(
      map((response) => {
        if (response && response.token && this.isBrowser) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Login
  login(email: string, password: string) {
    const body = { email, password };
    return this.http.post<any>(`${this.apiUrl}/login`, body).pipe(
      map((response) => {
        if (response && response.token && this.isBrowser) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Logout
  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Error handling
  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
}
