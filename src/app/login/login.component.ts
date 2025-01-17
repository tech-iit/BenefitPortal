import { Component } from '@angular/core';
import { AuthService } from './login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  // Forgot Password variables
  showForgotPasswordDialog: boolean = false;
  forgotPasswordEmployeeId: string = '';
  otpSent: boolean = false;
  otpVerified: boolean = false; // New flag for OTP verification
  enteredOtp: string = '';
  newPassword: string = '';

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {}

   onSubmit(): void {
    const user = parseInt(this.username, 10);
    this.authService.checkUser(user, this.password).subscribe(
      (response) => {
        const userObj = { username: user, role: response.role, emailId: response.emailId, name: response.name };
        localStorage.setItem(
          'userData',
          JSON.stringify({
            role: userObj.role,
            userId: userObj.username,
            emailId: userObj.emailId,
            name: userObj.name,
          })
        );
        if (response.role == 'Admin') {
          this.router.navigate(['/admin-dashboard'], { state: { user: userObj } });
        } else if (response.role == 'Employee') {
          this.router.navigate(['/employee-dashboard'], { state: { user: userObj } });
        }
      },
      (error) => {
        this.showSnackbar('Invalid credentials.', 'error');
        console.error(error);
      }
    );
  }


  openForgotPasswordDialog(): void {
    this.showForgotPasswordDialog = true;
    this.resetDialogFields();
  }

  closeForgotPasswordDialog(): void {
    this.showForgotPasswordDialog = false;
  }

  sendOtp(): void {
    if (!this.forgotPasswordEmployeeId) {
      this.showSnackbar('Please enter your SAP ID', 'error');
      return;
    }
    this.authService.sendOtp({ employeeId: this.forgotPasswordEmployeeId }).subscribe(
      () => {
        this.showSnackbar('OTP sent successfully.', 'success');
        this.otpSent = true; 
      },
      (error) => {
        this.showSnackbar('Error sending OTP. Please try again.', 'error');
        console.error(error);
      }
    );
  }

  verifyOtp(): void {
    if (!this.enteredOtp) {
      this.showSnackbar('Please enter the OTP.', 'error');
      return;
    }
    this.authService.verifyOtp({ employeeId: this.forgotPasswordEmployeeId, otpCode: this.enteredOtp }).subscribe(
      () => {
        this.showSnackbar('OTP verified successfully.', 'success');
        this.otpVerified = true; 
      },
      (error) => {
        this.showSnackbar('Invalid OTP. Please try again.', 'error');
        console.error(error);
      }
    );
  }

  resetPassword(): void {
    if (!this.newPassword) {
      this.showSnackbar('Please enter your new password.', 'error');
      return;
    }
    this.authService.resetPassword({ employeeId: this.forgotPasswordEmployeeId, newPassword: this.newPassword }).subscribe(
      () => {
        this.showSnackbar('Password reset successfully.', 'success');
      
      },
      (error) => {
        this.showSnackbar('Error resetting password. Please try again.', 'error');
        console.error(error);
      }
    );
  }

  private resetDialogFields(): void {
    this.forgotPasswordEmployeeId = '';
    this.otpSent = false;
    this.otpVerified = false;
    this.enteredOtp = '';
    this.newPassword = '';
  }
  private showSnackbar(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
    });
}
}
