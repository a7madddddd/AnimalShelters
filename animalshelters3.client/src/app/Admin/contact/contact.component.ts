import { Component } from '@angular/core';
import { QadomiService } from '../../../Services/qadomi.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  ConactArray: any;

  constructor(private _ser: QadomiService) { }

  ngOnInit() {
    this.ReplayContact();
  }

  ReplayContact() {
    this._ser.getContact().subscribe((data) => {
      this.ConactArray = data;
      console.log(this.ConactArray, "this.ConactArray");
    });
  }

  deleteContactById(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ser.deletContact(id).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'This message has been deleted successfully.',
            'success'
          );
          this.ReplayContact();
        });
      }
    });
  }


  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  openMail(email: string) {
    const mailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
    window.open(mailUrl, '_blank');
  }

}
