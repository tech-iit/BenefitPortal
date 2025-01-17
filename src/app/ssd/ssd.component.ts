import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  
    constructor(private http: HttpClient) {}
  
    ngOnInit(): void {
      this.fetchReimbursements();
    }
  
   
    fetchReimbursements(): void {
      this.http.post<any[]>(`${this.apiUrl}/GetAllSSDsForAdmin`,1)
        .subscribe(
          response => {
            this.bills = response;
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
            this.fetchReimbursements(); 
          },
          error => {
            console.error('Error updating status:', error);
          }
        );
    }
  }
  