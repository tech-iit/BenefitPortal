import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccessControlService } from '../access-control.service';
import { environment } from '../api-url';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  apibaseurl= environment.apiBaseUrl;
  showMessage: boolean = false;
  cards: { 
    Id: number;
    Name: string;
    Description: string;
    ImagePath: string;
    MinEligibilityCriteria: number;
    Category: string;
    AdminId: number;
    IsBookmarked: boolean;
  }[] = []; // Initialize as an empty array to store the benefits fetched from API

  categories = [
    { name: 'All', image: 'assets/images/all.png' },
    { name: 'health', image: 'assets/images/health.png' },
    { name: 'sports', image: 'assets/images/sports.png' },
    { name: 'education', image: 'assets/images/education.png' },
    { name: 'commute', image: 'assets/images/commute.png' },
    { name: 'travel', image: 'assets/images/travel.png' }
  ];
  filteredProducts = this.cards;
  searchQuery: string = '';

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private accessControl: AccessControlService
  ) {}
 
 emailid:any='';
  ngOnInit(): void {

    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const { userId } = JSON.parse(storedUserData);
      const {emailId} = JSON.parse(storedUserData);
      const {name}=JSON.parse(storedUserData);
      this.emailid=emailId;
      if (userId) {
        this.loadBenefits(userId);
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
          this.loadBenefits(userId);
          this.checkSubscription(this.emailid);
        }
      }
    });
  }

  loadBenefits(userId: string): void {
    const apiUrl = `${this.apibaseurl}/api/auth/ViewBenefit`; 
    this.http.post(apiUrl, { employeeId: userId })
      .subscribe((response: any) => {
        if (response.status) {
          this.cards = response.benefits;
          this.filteredProducts = this.cards;
        } else {
          this.cards = [];
          this.filteredProducts = [];
          console.log('No benefits found for this user');
        }
      }, error => {
        console.error('Error fetching benefits:', error);
      });
  }

  filterByCategory(category: string): void {
    if (category === 'All') {
      this.filteredProducts = this.cards;
    } else {
      this.filteredProducts = this.cards.filter(product => product.Category === category);
    }
  }
  idstored:number=-1;

  toggleBookmark(productId: number): void {
    const product = this.filteredProducts.find((p) => p.Id === productId);
    if (product) {
      product.IsBookmarked = !product.IsBookmarked;
    }
   
    this.idstored = productId;
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const { userId } = JSON.parse(storedUserData);
  
      if (userId) {
        const apiUrl = `${this.apibaseurl}/api/auth/Bookmark`;
        this.http.post(apiUrl, { employeeId: userId, benefitId: productId }).subscribe(
          (response: any) => {
            if (response.status) {
              this.showMessage = true;
              setTimeout(() => {
                this.showMessage = false;
                this.cdr.detectChanges();
              }, 1500);
            } 
          },
          (error) => {
            if (product) {
              product.IsBookmarked = !product.IsBookmarked;
              this.cdr.detectChanges();
            }
            console.error('Error toggling bookmark:', error);
          }
        );
      }
    } else {
      console.error('User data not found in local storage');
    }

  }
  subscribebyEmailId(emailId:string){
        console.log(emailId);
        const apiUrl = `${this.apibaseurl}/api/sub/Subscribe`;
        this.http.post(apiUrl, {emailId }).subscribe(
          (response: any) => {
            this.checkSubscription(emailId);
            if(response.status){
              this.showSnackbar('susbscribed!!!!!', 'success');
            }else{
              this.showSnackbar('Subscribtionn Failed!!', 'error');
            }
           
            console.log(response);
          },(error)=>{
              console.log(error);
          }
        );
  }
  buttonsubscribe:boolean=true;
  buttonUnsubscribe:boolean=false;
  checkSubscription(emailId:string){
    console.log(emailId);
    const apiUrl = `${this.apibaseurl}/api/sub/CheckSubscription`;
    this.http.post(apiUrl, {emailId }).subscribe(
      (response: any) => {
        console.log(response);
        if(response.check){
          this.buttonUnsubscribe=true;
          this.buttonsubscribe=false;
        }else{
          this.buttonUnsubscribe=false;
          this.buttonsubscribe=true;
        }
        console.log(response);
      },(error)=>{
          console.log(error);
      }
    );
  }

  UnsubscribebyEmailId(emailId:string){
    console.log(emailId);
    const apiUrl = `${this.apibaseurl}/api/sub/UnSubscribe`;
    this.http.post(apiUrl, {emailId }).subscribe(
      (response: any) => {
        this.checkSubscription(emailId);
        if(response.status){
          this.showSnackbar('Unsusbscribed!!!!!', 'success');
        }else{
          this.showSnackbar('Unsubscribed Failed!!', 'error');
        }
       
        console.log(response);
      },(error)=>{
          console.log(error);
      }
    );
  }

  private showSnackbar(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
    });
}
 commonService(){
  this.accessControl.setAccess(true);
 }
}