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

  contactData = {
    fullname: '',
    email: '',
    subject: '',
    message: ''
  };

  async onSubmit() {

    emailjs.init('TZ6WGG8HAEMrYFF7S')

    let resp= await emailjs.send("service_5yp8see","template_ud0m9un",{
      from_email: this.contactData.email,
      from_name: this.contactData.fullname,
      subject: this.contactData.subject,
      message: this.contactData.message,
      reply_to: "none",
      });

    this.snack.open('Email Sent Successfully');
  }
}
