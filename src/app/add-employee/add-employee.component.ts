import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../api-url';
interface ApiResponse {
  status: boolean;  // Corrected to boolean
}

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  beforeformsubmit=true;
apibaseurl= environment.apiBaseUrl;
  employeeData = {
    employeeId: '',
    password: '',
    name: '',
    emailId: '',
    contactNo: '',
    band: ''
  };

  adminId: string = '';
  responseMessage: string = '';  // Property to store response message
  responseStatus: boolean = false;  // Property to store the status (success or error)

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      this.adminId = userData.userId;  // Assuming the userData has 'userId'
    }
  }

  onSubmit(form: any) {
    if (form.valid) {
      // Include adminId in the payload
      const payload = {
        employeeId: this.employeeData.employeeId,
        password: this.employeeData.password,
        name: this.employeeData.name,
        emailId: this.employeeData.emailId,
        contactNo: this.employeeData.contactNo,
        band: this.employeeData.band
      };
      this.beforeformsubmit=false;
      console.log('Sending Employee Data:', payload);

      // Send the employee data to the backend API
      this.http.post<ApiResponse>(`${this.apibaseurl}/api/auth/AddEmployee`, payload)
        .subscribe(
          (response) => {
            console.log('Response from API:', response);
            if (response && response.status === true) {
              this.responseMessage = 'Employee Added Successfully';
              this.responseStatus = true;
            } else {
              this.responseMessage = 'Error adding employee';
              this.responseStatus = false;
            }

            // Hide the message after 5 seconds
            setTimeout(() => {
              this.responseMessage = '';
              this.responseStatus = false;
            }, 5000);

            // Reset form data after successful submission
            if (this.responseStatus === true) {
              this.employeeData = {
                employeeId: '',
                password: '',
                name: '',
                emailId: '',
                contactNo: '',
                band: ''
              };
            }
          },
          (error) => {
            console.error('Error occurred:', error);
            this.responseMessage = 'Error occurred during submission';
            this.responseStatus = false;

            setTimeout(() => {
              this.responseMessage = '';
              this.responseStatus = false;
            }, 5000);
          }
        );
    } else {
      console.error('Form is invalid');
    }
  }
}
