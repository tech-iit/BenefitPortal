import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../api-url';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  apibaseurl=environment.apiBaseUrl;
  benefitId: number | null = null;
  feedbackText: string = '';
  suggestion: string = '';
  EmployeeId: string = '';
  submissionStatus: boolean = false; 
  errorStatus: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const { userId } = JSON.parse(storedUserData);
      this.EmployeeId = userId;
    }
  }

  submitFeedback(form:any): void {
    const feedbackData = {
      BenefitId: this.benefitId,
      EmployeeId: parseInt(this.EmployeeId),  
      FeedbackText: this.feedbackText,
      Suggestion: this.suggestion
    };

    this.http.post(`${this.apibaseurl}/api/feedback/SubmitFeedback`, feedbackData)
      .pipe(
        catchError(error => {
          this.errorStatus = true;  
          setTimeout(() => this.errorStatus = false, 3000); 
          return throwError(error);
        })
      )
      .subscribe(response => {
        this.submissionStatus = true; 
        setTimeout(() => this.submissionStatus = false, 2000); 
        console.log('Feedback submitted successfully!', response);
      });
  }
}
