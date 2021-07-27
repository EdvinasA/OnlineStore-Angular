import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login/login.service";
import {UserInterface} from "../login/user.interface";
import {MatDialog} from "@angular/material/dialog";
import {RegisterAdminComponent} from "../register-admin/register-admin.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  pageTitle = 'Users';
  displayedColumns: string[] = ['userId', 'userName', 'password', 'first-name', 'last-name','age', 'email', 'role'];
  users: UserInterface[] = [];
  p: number = 1;
  role!: string | null;
  firstName!: string;
  lastName!: string;
  age!: number;
  email!: string;
  userName!: string;
  password!: string;

  constructor(private loginService: LoginService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loginService.getAllUsers().subscribe(data => this.users = data);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterAdminComponent, {
      width: '400px',
      data: { userName: this.userName,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        age: this.age,
        role: this.role
      }
    });
  }

}
