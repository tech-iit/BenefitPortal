import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar-employee',
  templateUrl: './navbar-employee.component.html',
  styleUrls: ['./navbar-employee.component.css']
})
export class NavbarEmployeeComponent implements OnInit {
  userId: string | null = null;
  emailId:string | null =null;
  name:string |null =null;
  ngOnInit(): void {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const { userId } = JSON.parse(storedUserData);
      const {emailId} = JSON.parse(storedUserData);
      const {name}=JSON.parse(storedUserData);
      this.emailId=emailId;
      this.name=name;
      this.userId = userId; 
    }
  }
  constructor(private router:Router){}
  logout(): void {
    localStorage.clear(); 
    this.router.navigate(['/login']);
  }
}
