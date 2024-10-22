import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @Input() user: any;
  imagePreview: string | ArrayBuffer | null = null; // To store image preview

  constructor() { }

  ngOnInit(): void {
    console.log(this.user);
    // Display the current objective if available
    this.user.objective = this.user.objective || '';
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];

      // Create a FileReader to preview the image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = reader.result; // Set image preview
      };
      reader.readAsDataURL(file);

      // You can also save the file if necessary
      // this.user.imageFile = file; // Save the file reference for upload
    }
  }

  onSubmit(): void {
    // Here you can handle the form submission,
    // e.g., send user data and image to the server
    console.log("User data submitted:", this.user);

    // You may want to send the image and other data to your service
    // this.myService.updateUser(this.user).subscribe(...);
  }
}
