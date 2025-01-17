import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../api-url';
@Component({
  selector: 'app-raise-ssd',
  templateUrl: './raise-ssd.component.html',
  styleUrls: ['./raise-ssd.component.css']
})
export class RaiseSsdComponent  implements OnInit {
  apibaseurl=environment.apiBaseUrl;
  title: string = '';
  description: string = '';
  ssdHistory: any[] = [];
  private apiUrl = `${this.apibaseurl}/api/ssd`;

  constructor(private http: HttpClient) { }

  employeeId: string = '';
  

  ngOnInit(): void {
    
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const { userId } = JSON.parse(storedUserData);
      this.employeeId = userId;
    }
    this.getSsdHistory();
  }

  raiseSsd(form:any): void {
    const ssdData = {
      EmployeeId: this.employeeId,
      Title: this.title,
      Description: this.description
    };

    this.http.post(`${this.apiUrl}/RaiseSSD`, ssdData).subscribe(response => {
      console.log(response); 
      this.getSsdHistory();
    }, error => {
      console.error('Error raising SSD:', error);
    });
  }

  getSsdHistory(): void {
    this.http.post<any[]>(`${this.apiUrl}/GetSSDHistoryByEmployeeId`, { EmployeeId: this.employeeId })
      .subscribe(history => {
        this.ssdHistory = history;
      }, error => {
        console.error('Error fetching SSD history:', error);
      });
  }
}
