import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient to make API requests
import { environment } from '../api-url';
// Define an interface for the response from the API
interface ApiResponse {
  status: string;
}

@Component({
  selector: 'app-add-benefit',
  templateUrl: './add-benefit.component.html',
  styleUrls: ['./add-benefit.component.css']
})
export class AddBenefitComponent {
  
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  beforeformsubmit=true;
  apibaseurl = environment.apiBaseUrl;
  benefitData = {
    name: '',
    description: '',
    imagePath: '',
    category: '',
    eligibility: ''
  };
  adminId: string = '';
  responseMessage: string = '';  // New property to store response message
  responseStatus: boolean =false;  // Property to store the status (success or error)

  // Inject HttpClient to make API calls
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
        adminId: this.adminId,
        name: this.benefitData.name,
        description: this.benefitData.description,
        imagepath: this.imageUrl,
        category: this.benefitData.category,
        eligibility: this.benefitData.eligibility
      };

      console.log('Sending Form Data:', payload);

      // Send this data to the backend API
      this.http.post<ApiResponse>(`${this.apibaseurl}/api/auth/AddBenefit`, payload)  // Type the response
        .subscribe(
          (response) => {
            console.log('Response from API:', response);
            // Handle the response and set the message based on success or failure
            if (response && response.status) {
              this.responseMessage = "Benefits Uploaded Successfully";  // Success message
              this.responseStatus = true;  // Set status as success
              console.log(this.responseStatus);
              console.log(this.responseMessage);
            } else {
              this.responseMessage ="Error uploading your benefit"; 
              this.responseStatus = false;  
              console.log(this.responseStatus);
              console.log(this.responseMessage);
            }

            // Hide the message after 5 seconds
            setTimeout(() => {
              this.responseMessage = '';
              this.responseStatus = false;
            }, 5000);
          this.beforeformsubmit=false;
           
            // Optionally, reset form data after successful submission
            if (this.responseStatus === true) {
              this.benefitData = {
                name: '',
                description: '',
                imagePath: '',
                category: '',
                eligibility: ''
              };
            }
          },
          (error) => {
            console.error('Error occurred:', error);
            this.responseMessage = 'Error occurred during submission';  // Error message
            this.responseStatus = false;  // Set status as error

            // Hide the error message after 5 seconds
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


  // Replace with your backend API URL
  private apiUrl = 'https://benefitportalwebapp-c3bgdkgmdjfthefq.centralindia-01.azurewebsites.net/hello/image/UploadImage';


  // Handle file selection
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.uploadImage(); // Automatically upload when file is selected
    }
  }

  // Upload the selected image to the backend
  uploadImage(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
  
      this.http.post(this.apiUrl, formData)
        .subscribe(
          (response: any) => {
            if (response.success) {
              this.imageUrl = response.imageUrl; // The image URL returned by backend
            } else {
              console.error(response.message);
            }
          },
          (error) => {
            console.error('Error uploading image', error);
          }
        );
    }
  }
}  

