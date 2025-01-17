import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userId: string | null = null;
  emailId:string | null =null;
  name:string |null =null;
  ngOnInit(): void {
    // Fetch user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const { userId } = JSON.parse(storedUserData);
      const {emailId} = JSON.parse(storedUserData);
      const {name}=JSON.parse(storedUserData);
      this.emailId=emailId;
      this.name=name;
      // console.log(emailId);
      // console.log(name);
      this.userId = userId; // Set the userId for display
    }
  }

  constructor(private router:Router){}
  logout(): void {
    localStorage.clear(); 
    this.router.navigate(['/login']);
  }
}
