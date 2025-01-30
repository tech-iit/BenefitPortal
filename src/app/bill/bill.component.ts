import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../api-url';
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  apibaseurl=environment.apiBaseUrl;
    cellPhoneBill = {
      id: 'Cell Phone',
      description: 'Reimbursement for your monthly cell phone bill.',
      path: 'assets/images/phone.jpg',
      status: 'Pending'  // Default status set to Pending
    };
  
    wifiReimbursement = {
      id: 'WiFi',
      description: 'Reimbursement for your monthly WiFi bill.',
      path: 'assets/images/wifi.jpg',
      status: 'Pending'  // Default status set to Pending
    };
  
    formData = {
      amount: 0,
      notes: ''
    };
  
    dialogVisible: boolean = false;
    selectedBenefit: any = null;
  
    reimbursementHistory: {
      id: string;
      amount: number;
      notes: string;
      status: string;
      date: string;  // We will manually generate date as string
      response:string;
    }[] = [];
  
    employeeId: string = '';
  
    constructor(private http: HttpClient) {}
  
    ngOnInit(): void {
      
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        const { userId } = JSON.parse(storedUserData);
        this.employeeId = userId;
      }
      this.fetchReimbursementHistory(); // Fetch reimbursement history on init
    }
  
    openDialog(benefitType: string): void {
      if (benefitType === 'cellPhoneBill') {
        this.selectedBenefit = this.cellPhoneBill;
      } else if (benefitType === 'wifiReimbursement') {
        this.selectedBenefit = this.wifiReimbursement;
      }
      this.dialogVisible = true;
    }
  
    closeDialog(): void {
      this.dialogVisible = false;
    }
  
    submitForm(form:any): void {
      // Ensure the amount is greater than 0 before submitting
      if (this.formData.amount > 0) {
        const reimbursementData = {
          employeeId: this.employeeId,
          amount: this.formData.amount,
          notes: this.formData.notes,
          status: 'Requested',  // Default status is "Requested"
          reimbursementType: this.selectedBenefit.id
        };
  
        // Make the API call to add the reimbursement
        this.http.post(`${this.apibaseurl}/api/reimbursement/AddReimbursement`, reimbursementData)
          .subscribe(response => {
            // Successfully added reimbursement, update the history
            this.reimbursementHistory.push({
              id: this.selectedBenefit.id,
              amount: this.formData.amount,
              notes: this.formData.notes,
              status: 'Requested', // Set the status to 'Requested'
              date: new Date().toLocaleDateString() , // Add current date when submitting form
              response: ''
            });
           
            this.selectedBenefit.status = 'Requested'; // Update status to 'Requested'
            this.closeDialog();
            console.log('Reimbursement submitted:', response);
          }, error => {
            console.error('Error submitting reimbursement:', error);
          });
      }
    }

    fetchReimbursementHistory(): void {
      if (this.employeeId) {
        this.http.get<any[]>(`${this.apibaseurl}/api/reimbursement/GetReimbursements/${this.employeeId}`)
          .subscribe(response => {
            // Map the API response to match the required history format
            this.reimbursementHistory = response.map(item => ({
              id: item.ReimbursementType,  // Mapping to reimbursementType
              amount: item.Amount,  // Mapping to Amount
              notes: item.Notes,  // Mapping to Notes
              status: item.Status,  // Mapping to Status
              date: new Date().toLocaleDateString(),
              response: item.BillResponse,
            }));
           
            
            // After fetching, update the status of reimbursements
            this.updateReimbursementStatus();
          }, error => {
            console.error('Error fetching reimbursement history:', error);
          });
      }
    }
  
    updateReimbursementStatus(): void {
      // Check if all reimbursements for Cell Phone are either Approved or Declined
      const cellPhoneReimbursements = this.reimbursementHistory.filter(item => item.id === 'Cell Phone');
      console.log(this.reimbursementHistory);
      const allCellPhoneApprovedOrDeclined = cellPhoneReimbursements.every(item => item.status === 'Approve' || item.status === 'Declined');
      if (allCellPhoneApprovedOrDeclined) {
        this.cellPhoneBill.status = 'Pending'; // Update status to 'Pending' for Cell Phone
      } else {
        this.cellPhoneBill.status = 'Requested'; // Otherwise, set status to 'Requested'
      }
  
      // Check if all reimbursements for WiFi are either Approved or Declined
      const wifiReimbursements = this.reimbursementHistory.filter(item => item.id === 'WiFi');
      const allWifiApprovedOrDeclined = wifiReimbursements.every(item => item.status === 'Approve' || item.status === 'Declined');
      if (allWifiApprovedOrDeclined) {
        this.wifiReimbursement.status = 'Pending'; // Update status to 'Pending' for WiFi
      } else {
        this.wifiReimbursement.status = 'Requested'; // Otherwise, set status to 'Requested'
      }
    }
  
    setPendingStatus(benefitType: string): void {
      if (benefitType === 'cellPhoneBill') {
        this.cellPhoneBill.status = 'Pending'; // Update status back to 'Pending'
      } else if (benefitType === 'wifiReimbursement') {
        this.wifiReimbursement.status = 'Pending'; // Update status back to 'Pending'
      }
      console.log(`${benefitType} status set to Pending.`);
    }
  }
  