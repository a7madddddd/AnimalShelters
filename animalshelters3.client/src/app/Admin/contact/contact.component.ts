import { Component } from '@angular/core';
import { QadomiService } from '../../../Services/qadomi.service';

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
    this._ser.deletContact(id).subscribe(() => {
      alert("This message deleted successfully");
      this.ReplayContact();
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
