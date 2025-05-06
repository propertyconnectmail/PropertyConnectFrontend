import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// const httpOptions = {
//   headers: new HttpHeaders({ 'Access-Control-Allow-Origin': 'https://cms-dle.netlify.app/' })
// }


export class AuthService {

  private apiUrl = 'http://localhost:5000/api/auth/web/';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials).pipe(
      tap(response => {
        localStorage.setItem('user', JSON.stringify(response));
        this.loggedIn.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('user');
  }
}