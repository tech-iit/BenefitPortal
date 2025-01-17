import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../api-url';
// import {environment} from 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiBaseUrl;
  private apiUrl = `${this.baseUrl}/api/auth`; // API URL

  constructor(private http: HttpClient) {}

  // Check user credentials
  checkUser(username: number, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Authorize`, { username, password });
  }

  // Send OTP for password reset
  sendOtp(payload: { employeeId: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/send-otp`, payload);
  }

  // Verify OTP
  verifyOtp(payload: { employeeId: string, otpCode: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verify-otp`, payload);
  }

  // Reset password
  resetPassword(payload: { employeeId: string, newPassword: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, payload);
  }
}
