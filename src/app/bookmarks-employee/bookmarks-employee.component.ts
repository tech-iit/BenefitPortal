import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from '../api-url';
@Component({
  selector: 'app-bookmarks-employee',
  templateUrl: './bookmarks-employee.component.html',
  styleUrls: ['./bookmarks-employee.component.css']
})
export class BookmarksEmployeeComponent implements OnInit {
  apibaseurl=environment.apiBaseUrl;
  bookmarkedarray: any[] = [];  // Initialize as an empty array
  showMessage: boolean = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const { userId } = JSON.parse(storedUserData);

      if (userId) {
        this.loadBookmarkedBenefits(userId);
      } else {
        console.error('User ID not found in local storage');
      }
    } else {
      console.error('User data not found in local storage');
    }

    this.route.params.subscribe(() => {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        const { userId } = JSON.parse(storedUserData);

        if (userId) {
          this.loadBookmarkedBenefits(userId);
        }
      }
    });
  }

  loadBookmarkedBenefits(userId: string): void {
    const apiUrl = `${this.apibaseurl}/api/auth/ViewBenefit`; 
    this.http.post(apiUrl, { employeeId: userId })
      .subscribe((response: any) => {
        if (response.status) {
          this.bookmarkedarray = response.benefits.filter((benefit: any) => benefit.IsBookmarked);
        } else {
          this.bookmarkedarray = [];
          console.log('No bookmarked benefits found for this user');
        }
      }, error => {
        console.error('Error fetching bookmarked benefits:', error);
      });
  }

  toggleBookmark(BenefitId: number): void {
    const Benefit = this.bookmarkedarray.find((b) => b.Id === BenefitId);
    if (Benefit) {
      Benefit.IsBookmarked = !Benefit.IsBookmarked;
      if (!Benefit.IsBookmarked) {
        setTimeout(() => {
          this.bookmarkedarray = this.bookmarkedarray.filter((b) => b.Id !== BenefitId);
          this.cdr.detectChanges();
        }, 500);
      }
      this.showMessage = true;
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        const { userId } = JSON.parse(storedUserData);
        if (userId) {
          const apiUrl = `${this.apibaseurl}/api/auth/Bookmark`;
          this.http.post(apiUrl, { employeeId: userId, benefitId: BenefitId })
            .subscribe((response: any) => {
              if (response.status) {
                setTimeout(() => {
                  this.showMessage = false;
                  this.cdr.detectChanges();
                }, 1500);
              }
            }, (error) => {
              console.error('Error toggling bookmark:', error);
              Benefit.IsBookmarked = !Benefit.IsBookmarked;
              this.cdr.detectChanges();
            });
        }
      }
    }
  }
  
}
