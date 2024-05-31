import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import emailjs from '@emailjs/browser'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private fb:FormBuilder, private snack:MatSnackBar) { }

  contactData = {
    fullname: '', 
    email: '',
    subject: '',
    message: ''
  };

  async onSubmit() {

    emailjs.init('fIQYtOablJh_U8NvK')

    let resp= await emailjs.send("service_soyo507","template_tbgzbwo",{
      from_email: this.contactData.email,
      from_name: this.contactData.fullname,
      subject: this.contactData.subject,
      message: this.contactData.message,
      reply_to: "none",
      });

      this.snack.open('Email Sent Successfully');
  }
}
