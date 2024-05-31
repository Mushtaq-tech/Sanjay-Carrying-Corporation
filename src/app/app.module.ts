import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { ContactComponent } from './pages/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutusComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, FormsModule, HttpClientModule, BrowserAnimationsModule, MatSnackBarModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
