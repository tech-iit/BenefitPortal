import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../api-url';
@Component({
  selector: 'app-benefit',
  templateUrl: './benefit.component.html',
  styleUrls: ['./benefit.component.css']
})
export class BenefitComponent implements OnInit {
  apibaseurl=environment.apiBaseUrl;
  benefit: {
    id: string;
    name:string;
    description: string;
    path: string;
  } = {
    id: '',
    name:'',
    description: '',
    path: '',
  };

  // Array to store availed benefits, initially empty
  availedBenefits: {
    id: string;
    name:string;
    description: string;
    path: string;
  }[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  employeeId: string = '';

  ngOnInit(): void {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      this.employeeId = userData.userId;  // Assuming the userData has 'userId'
    }

    // Fetching the benefit details from query parameters
    this.route.queryParams.subscribe((params) => {
      this.benefit = {
        id: params['id'] || '',
        name:params['name']||'',
        description: params['description'] || 'Default description.',
        path: params['path'] || '',
      };
    });
    this.avail();
  }
  avail():void{
    const payload = {
      employeeId: this.employeeId,
    };

    // Make a POST request to insert the availed benefit and get updated list of availed benefits
    this.http.post<{ status: boolean, benefits: Array<{ Id: string, Name: string, Description: string, ImagePath: string }> }>(`${this.apibaseurl}/api/auth/Avail`, payload)
      .subscribe(
        (response) => {
          if (response.status) {
            // On success, update the availed benefits with the new data from the response
            this.availedBenefits = response.benefits.map(benefit => ({
              id: benefit.Id,
              name:benefit.Name,
              description: benefit.Description,
              path: benefit.ImagePath,
            }));
          } else {
            console.error('Error availing benefit:', response);
          }
        },
        (error) => {
          console.error('Error availing benefit:', error);
        }
      );
  }
  availBenefit(): void {
   
    const payload = {
      benefitId: this.benefit.id,
      employeeId: this.employeeId,
    };
    this.http.post<{ status: boolean, benefits: Array<{ Id: string, Name: string, Description: string, ImagePath: string }> }>(`${this.apibaseurl}/api/auth/AvailedBenefit`, payload)
      .subscribe(
        (response) => {
          if (response.status) {
            this.availedBenefits = response.benefits.map(benefit => ({
              id: benefit.Id,
              name:benefit.Name,
              description: benefit.Description,
              path: benefit.ImagePath,
            }));
            console.log('Benefit successfully availed:', response);
          } else {
            console.error('Error availing benefit:', response);
          }
        },
        (error) => {
          console.error('Error availing benefit:', error);
        }
      );
  }
}
