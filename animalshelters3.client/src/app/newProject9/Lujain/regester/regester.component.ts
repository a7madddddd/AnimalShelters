import { Component } from '@angular/core';
import { LujainServiceService } from '../LujainService/lujain-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({
  selector: 'app-regester',
  templateUrl: './regester.component.html',
  styleUrl: './regester.component.css'
})
export class RegesterComponent {
  constructor(private _ser: LujainServiceService, private _router: Router) { }

  ngOnInit() { }

  SignUp(data: any) {
    var form = new FormData();

    for (let key in data) {
      form.append(key, data[key]);
    }

    this._ser.SignUserUp(form).subscribe(() => {
      // SweetAlert for successful sign up
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Account created successfully!' // Updated success message
      });

      this._router.navigate(['/Login']);
    },
      (error) => {
        // SweetAlert for sign up error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error || 'An error occurred during sign-up.'
        });
      });
  }
}
