import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Login } from "../login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // variable to store the form data.
  private form_data: Login;
  // variables to control message box.
  public showDialog = false;
  public successMessage = true;
  public serverNotFoundMessage = true;
  public failureMessage = true;

  constructor(private authservice: AuthService) { }

  ngOnInit() { }

  onSubmit(form): void
  {
    // validation check
    if(form.invalid){
      return;
    }

    this.form_data = form.value;
    //post to server..
    this.authservice.postmethod(this.form_data.username, this.form_data.password)
      // if 'authservice.postmethod' performed successfully..
    .then( success => { 
        //You may check!
        console.log("Post function performed");
        //If login'data is correct..
        if(this.authservice.result_check == true)
        {
          this.successMessage = false; // show message 'login success'.
          this.showDialog = true;
          this.serverNotFoundMessage = true;
          this.failureMessage = true;
        }
        //If login'data is not correct..
        else{ 
          this.failureMessage = false; // show message 'login failure'.
          this.showDialog = true;
          this.successMessage = true;
          this.serverNotFoundMessage = true;
        }
    })
      // If the connection to the server fails..
    .catch( error => {
      this.serverNotFoundMessage = false; // show message 'server not found'.
      this.showDialog = true;
      this.successMessage = true;
      this.failureMessage = true;
    });
  }
}
