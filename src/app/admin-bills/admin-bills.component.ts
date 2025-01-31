import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    BillResponse:string
  }[] = []; 

  selectedBill: any = null; 
  apiUrl = `${this.apibaseurl}/api/admin/reimbursement`;

  constructor(private http: HttpClient,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fetchReimbursements();
  }

 
  fetchReimbursements(): void {
    this.http.get<any[]>(`${this.apiUrl}/GetAllReimbursements`)
      .subscribe(
        response => {
          // this.bills = response;
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

  responseText:string='';
  updateReimbursementStatus(reimbursementId: number, status: string): void {
    const payload = {
      reimbursementId: reimbursementId,
      status: status,
      responseByadmin:this.responseText
    };

    this.http.post(`${this.apiUrl}/UpdateReimbursementStatus`, payload)
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
