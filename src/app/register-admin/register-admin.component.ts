import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {LoginService} from "../login/login.service";
import {RegisterComponent} from "../register/register.component";

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {
  nothing: any;
  hide = true;
  registerForm!: FormGroup;
  roles = ['ADMIN', 'USER'];

  reactiveForm() {
    this.registerForm = this.fb.group({
      firstName: ['', { validators: [Validators.required]}],
      lastName: ['', { validators: [Validators.required]}],
      age: ['', { validators: [Validators.required]}],
      email: ['',{validators: [Validators.required, Validators.email],}],
      userName: ['',{validators: [Validators.required]}],
      password: ['', { validators: [Validators.required]}],
      role:['', {validators: [Validators.required]}],
    })
  }


  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    private loginService: LoginService,
    private fb: FormBuilder) {

  }

  onNoClick(): void {
    this.loginService.registerAdmin(this.registerForm.value).subscribe(result => this.nothing);
    this.dialogRef.close();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.reactiveForm();
  }

}
