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
  displayedColumns: string[] = ['userId', 'userName', 'password', 'first-name', 'last-name','age', 'email', 'role', 'delete'];
  users: UserInterface[] = [];
  p: number = 1;
  role!: string | null;
  firstName!: string;
  lastName!: string;
  age!: number;
  email!: string;
  userName!: string;
  password!: string;
  errorMessage = "";

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

  deleteUserById(userId: number): void {
    this.users = this.users.filter(item => item.id !== userId);
    this.loginService.deleteUserById(userId)
      .subscribe({
        next: message => {
          message = "Delete succesfull"
        },
        error: err => this.errorMessage = err
      });
  }

}
