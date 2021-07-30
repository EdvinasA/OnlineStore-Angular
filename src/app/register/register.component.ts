import {Component,  OnInit} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {LoginService} from "../login/login.service";
import {FormBuilder,FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit{

  nothing: any;
  hide = true;
  registerForm!: FormGroup;

  reactiveForm() {
    this.registerForm = this.fb.group({
      firstName: ['', { validators: [Validators.required]}],
      lastName: ['', { validators: [Validators.required]}],
      age: ['', { validators: [Validators.required]}],
      email: ['',{validators: [Validators.required, Validators.email],}],
      userName: ['',{validators: [Validators.required]}],
      password: ['', { validators: [Validators.required]}],
    })
  }

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    private loginService: LoginService,
    private fb: FormBuilder) {
  }

  onNoClick(): void {
    this.loginService.registerUser(this.registerForm.value).subscribe(result => this.nothing);
    this.dialogRef.close();
  }
  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.reactiveForm();
  }
}
