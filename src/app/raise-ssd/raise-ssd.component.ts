import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private http: HttpClient,private snackBar: MatSnackBar) { }

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
      this.showSnackbar('SSD raised!!!!!', 'success');
      this.getSsdHistory();
    }, error => {
      console.error('Error raising SSD:', error);
    });
  }

  getSsdHistory(): void {
    this.http.post<any[]>(`${this.apiUrl}/GetSSDHistoryByEmployeeId`, { EmployeeId: this.employeeId })
      .subscribe(history => {
        // this.ssdHistory = history;
        this.ssdHistory= history.sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime());
      }, error => {
        console.error('Error fetching SSD history:', error);
      });
  }
  private showSnackbar(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
    });
}
}
