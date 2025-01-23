import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'BenefitPortal';
  role: string = ''; // Role will determine what navbar to show

  constructor(private router: Router, private cdr: ChangeDetectorRef,private breakpointObserver: BreakpointObserver) {}
  isSmallScreen: boolean = false;
  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Handset])
    .subscribe(result => {
      this.isSmallScreen = result.matches;
    });
    // Initial check for user data in localStorage
    this.checkUserData();

    // Subscribe to router events to handle navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // When navigating to login page, clear localStorage
        if (event.urlAfterRedirects === '/login') {
          localStorage.clear();
          this.role = ''; // Clear role in case user logs out
          this.cdr.detectChanges(); // Ensure the view is updated
        } else {
          // Otherwise, get user data from localStorage
          this.checkUserData();
        }
      }
    });
  }

  checkUserData() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      this.role = userData.role;
      this.cdr.detectChanges(); // Ensure Angular detects the change
    }
  }


  
}
