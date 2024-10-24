import { Component } from '@angular/core';
import { QadomiService } from '../../../../Services/qadomi.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  ngOnInit() {

  }
  //mail: string = 'https://mail.google.com/mail/?view=cm&fs=1&to=ahmad.alqadomi02@gmail.com';
  constructor(private _ser: QadomiService) {

  }

  AddNewMessage(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }

    this._ser.addContact(form).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Message Sent',
        text: 'The message has been sent successfully!'
      });
    },
      (error) => {
        if (error.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Data Error',
            text: 'There was an error in the data you submitted. Please check your inputs.'
          });
        } else if (error.status === 500) {
          Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'An internal server error occurred. Please try again later.'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Unexpected Error',
            text: `An unexpected error occurred: ${error.message}`
          });
        }
      }
    );
  }


}
