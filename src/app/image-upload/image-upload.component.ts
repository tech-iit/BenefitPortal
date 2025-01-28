import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-image-upload',
  template: `
    <div>
      <h1>Image URL Converter</h1>
      <input type="file" (change)="onFileSelected($event)" />
      <button (click)="uploadImage()">Upload</button>
      <p *ngIf="imageUrl">Image URL: <a [href]="imageUrl" target="_blank">{{ imageUrl }}</a></p>
    </div>
  `
})
export class ImageUploadComponent {
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  // Replace with your backend API URL
  private apiUrl = 'http://localhost:61298/hello/image/UploadImage';

  constructor(private http: HttpClient) {}

  // Handle file selection
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
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