import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';

import { HomeComponent } from './home.component';
import { SignupComponent } from '../signup/signup.component';

import { SectionsModule } from '../sections/sections.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        SectionsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule
    ],
    declarations: [ HomeComponent , SignupComponent , LoginComponent],
    exports:[ HomeComponent ],
    providers: []
})
export class HomeModule { }
