import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LujainServiceService } from '../LujainService/lujain-service.service';
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @Input() user: any;
  @Output() userUpdated = new EventEmitter<any>();
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private _ser: LujainServiceService) { }

  ngOnInit(): void {
    console.log(this.user);
    this.user.objective = this.user.objective || '';
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  OnSubmit() {
    this.Edit();
  }

  Edit(): void {
    const formData = new FormData();

    formData.append('UserName', this.user.userName);
    formData.append('Email', this.user.email);
    formData.append('Description', this.user.description || '');
    formData.append('UserAge', this.user.userAge?.toString() || '');
    formData.append('UserAdderss', this.user.userAdderss || '');

    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
    }

    this._ser.updateProfile(this.user.userId, formData).subscribe(
      response => {
        console.log('Profile updated successfully:', response);
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          text: 'Profile updated successfully'
        });

        this.userUpdated.emit({ ...this.user, image: this.imagePreview });
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating profile:', error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update profile: ' + (error.error.message || 'An error occurred.')
        });
      }
    );
  }
}
