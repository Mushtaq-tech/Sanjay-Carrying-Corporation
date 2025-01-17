import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import emailjs from '@emailjs/browser'
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private fb:FormBuilder, private snack:MatSnackBar) { }

  emailSent = false;
  contactData = {
    fullname: '',
    email: '',
    subject: '',
    message: '',
    phNo: ''
  };

  async onSubmit() {

    emailjs.init('fIQYtOablJh_U8NvK')

    let resp= await emailjs.send("service_soyo507","template_tbgzbwo",{
      from_email: this.contactData.email,
      from_name: this.contactData.fullname,
      subject: this.contactData.subject,
      message: this.contactData.message,
      reply_to: "none",
      ph_no: this.contactData.phNo
      });

      this.emailSent = true; // Show the success message
      setTimeout(() => {
        this.emailSent = false; // Hide the success message after 3 seconds
      }, 3000);
  }
}
