import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../api-url';
@Component({
  selector: 'app-admin-bills',
  templateUrl: './admin-bills.component.html',
  styleUrls: ['./admin-bills.component.css']
})
export class AdminBillsComponent implements OnInit {
  apibaseurl=environment.apiBaseUrl;
  bills: {
    ReimbursementId: number;
    EmployeeId: number;
    Amount: number;
    Notes: string;
    Status: string;
    ReimbursementType: string;
    Date:Date;
  }[] = []; 

  selectedBill: any = null; 
  apiUrl = `${this.apibaseurl}/api/admin/reimbursement`;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchReimbursements();
  }

 
  fetchReimbursements(): void {
    this.http.get<any[]>(`${this.apiUrl}/GetAllReimbursements`)
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
      reimbursementId: reimbursementId,
      status: status
    };

    this.http.post(`${this.apiUrl}/UpdateReimbursementStatus`, payload)
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
