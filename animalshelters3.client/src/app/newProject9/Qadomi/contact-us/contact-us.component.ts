import { Component } from '@angular/core';
import { QadomiService } from '../../../../Services/qadomi.service';

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
    debugger
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }

    this._ser.addContact(form).subscribe(() => {
      alert("The Message Send Successfully")
    },
      (error) => {
        //if (error.status === 400) {
        //  alert("There was an error in the data you submitted. Please check your inputs.");
        //} else if (error.status === 500) {
        //  alert("An internal server error occurred. Please try again later.");
        //} else {
        //  alert("An unexpected error occurred: " + error.message);
        //}
      }
    );
  }

}
