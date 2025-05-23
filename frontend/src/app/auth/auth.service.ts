import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // Ruta API Django
  constructor( private http: HttpClient ) { }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register/`, data);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/token/`, credentials);
  }
}
