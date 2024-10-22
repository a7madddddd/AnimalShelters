import { Component } from "@angular/core";
import { LujainServiceService } from "../LujainService/lujain-service.service";
import { Router } from "@angular/router";
import { BehaviorSubjectService } from "../BehaviorSubject/behavior-subject.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  constructor(
    private _ser: LujainServiceService,
    private _router: Router,
    private behaviorSubjectService: BehaviorSubjectService 
  ) { }

  ngOnInit() { }

  Login(data: any) {
    const form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }

    console.log("Login Data:", data);

    this._ser.LoginUser(form).subscribe(
      (response) => {
        console.log("Response from LoginUser:", response);

        if (response.userId) {
          this.behaviorSubjectService.setUserId(response.userId);
        //  localStorage.setItem('userId', response.userId); 
        } else {
          console.warn("User ID not found in response.");
        }

        alert("User Logged In Successfully");
         this._router.navigate(['']);
      },
      (error) => {
        console.error("Login Error:", error);
        alert("Login failed: " + (error.error.message || "An error occurred."));
      }
    );
  }

}
