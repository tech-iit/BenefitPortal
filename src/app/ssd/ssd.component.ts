import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../api-url';
@Component({
  selector: 'app-ssd',
  templateUrl: './ssd.component.html',
  styleUrls: ['./ssd.component.css']
})
export class SsdComponent implements OnInit {
 apibaseurl=environment.apiBaseUrl;
    bills: {
      SSDId: number;
      EmployeeId: number;
      Title: string;
      Description: string;
      Status: string;
      Date:Date;
    }[] = []; 
  
    selectedBill: any = null; 
    apiUrl = `${this.apibaseurl}/api/ssd`;
  
    constructor(private http: HttpClient,private snackBar: MatSnackBar) {}
  
    ngOnInit(): void {
      this.fetchReimbursements();
    }
  
   
    fetchReimbursements(): void {
      this.http.post<any[]>(`${this.apiUrl}/GetAllSSDsForAdmin`,1)
        .subscribe(
          response => {
            this.bills= response.sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime());
          },
          error => {
            console.error('Error fetching reimbursements:', error);
          }
        );
    }
  
   
    openBillDialog(bill: any): void {
      this.selectedBill = bill;
    }
  
   
    closeBillDialog(): void {
      this.selectedBill = null;
    }
  
    approveBill(reimbursementId: number): void {
      this.updateReimbursementStatus(reimbursementId, 'Approve');
      setTimeout(() => {
        this.closeBillDialog(); 
      }, 100); 
    }
  
   
    declineBill(reimbursementId: number): void {
      this.updateReimbursementStatus(reimbursementId, 'Declined');
      setTimeout(() => {
        this.closeBillDialog(); 
      }, 100); 
    }
  
    updateReimbursementStatus(reimbursementId: number, status: string): void {
      const payload = {
        SSDId: reimbursementId,
        Status: status
      };
  
      this.http.post(`${this.apiUrl}/UpdateSSDStatus`, payload)
        .subscribe(
          response => {
            console.log('Status updated successfully:', response);
             this.showSnackbar('Status updated successfully!!!!', 'success');
            this.fetchReimbursements(); 
          },
          error => {
            console.error('Error updating status:', error);
          }
        );
    }
    private showSnackbar(message: string, type: 'success' | 'error'): void {
      this.snackBar.open(message, 'Close', {
        duration: 3000,
        panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
      });
  }
  }
  