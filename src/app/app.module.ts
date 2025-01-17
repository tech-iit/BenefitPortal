import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { BenefitComponent } from './benefit/benefit.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddBenefitComponent } from './add-benefit/add-benefit.component';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SsdComponent } from './ssd/ssd.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { BookmarksEmployeeComponent } from './bookmarks-employee/bookmarks-employee.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { RaiseSsdComponent } from './raise-ssd/raise-ssd.component';
import { NavbarEmployeeComponent } from './navbar-employee/navbar-employee.component';
import { FooterComponent } from './footer/footer.component';
import { BillComponent } from './bill/bill.component';
import { AdminBillsComponent } from './admin-bills/admin-bills.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthGuard } from './auth.guard';
import { employeeauth } from './employeeauth.guard';
import { AccessGuard } from './access.guard';
import { RestrictedComponent } from './restricted/restricted.component';
const routesArray:Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Default route
  {path:'login', component: LoginComponent},
  {path:'admin-dashboard', component: AdminDashboardComponent,canActivate:[employeeauth]},
  {path:'employee-dashboard', component: EmployeeDashboardComponent,
    canActivate: [AuthGuard]},
  {path:'benefitdetails', component: BenefitComponent,canActivate: [AccessGuard]},
  {path:'add-employee', component: AddEmployeeComponent,canActivate:[employeeauth]},
  {path:'add-benefit', component: AddBenefitComponent,canActivate:[employeeauth]},
  {path:'bookmarks',component:BookmarksComponent,canActivate:[employeeauth]},
  {path:'ssd',component:SsdComponent,canActivate:[employeeauth]},
  {path:'bookmarks-employee', component: BookmarksEmployeeComponent, canActivate: [AuthGuard]},
  {path:'feedback', component: FeedbackComponent, canActivate: [AuthGuard]},
  {path:'raiseSSD', component: RaiseSsdComponent, canActivate: [AuthGuard]},
  {path:'bill',component:BillComponent, canActivate: [AuthGuard]},
  { path: 'admin-bills', component: AdminBillsComponent,canActivate:[employeeauth] },
  {path:'app-restricted',component:RestrictedComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeDashboardComponent,
    BenefitComponent,
    AdminDashboardComponent,
    AddEmployeeComponent,
    AddBenefitComponent,
    BookmarksComponent,
    NavbarComponent,
    SsdComponent,
    BookmarksEmployeeComponent,
    FeedbackComponent,
    RaiseSsdComponent,
    NavbarEmployeeComponent,
    FooterComponent,
    BillComponent,
    AdminBillsComponent,
    RestrictedComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routesArray),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
