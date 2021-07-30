import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginService} from "./login.service";
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponent} from "../register/register.component";
import {UserInterface} from "./user.interface";
import {environment} from "../../environments/environment";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  model: any = {};
  loading: any;
  firstName!: string;
  lastName!: string;
  age!: number;
  email!: string;
  userName!: string;
  password!: string;
  role!: string;
  users: UserInterface[] = [];
  subscription!: Subscription;


  errorMessage = 'Invalid Credentials';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog,
    private loginService: LoginService
  ) {
    //
  }


  ngOnInit() {
    sessionStorage.setItem('token', '');
    this.loginService.getAllUsers().subscribe({
      next: users => {
        this.users = users;
      },
      error: err => this.errorMessage = err
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '400px',
      data: { userName: this.userName,
              password: this.password,
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              age: this.age
      }
    }).afterClosed().subscribe(() => this.router.navigate([this.router.url]));
  }


  login() {
    let url = environment.apiURL + 'login';
    let loginUser = {
      userName: this.model.userName,
      password: this.model.password
    }
    const headers = new HttpHeaders({Authorization: "Basic" + btoa(this.model.username + ':' + this.model.password)})
    this.http.post(url, loginUser).subscribe(isValid => {
      if (isValid) {
        sessionStorage.setItem(
          'token',
          btoa(this.model.userName + ':' + this.model.password)
        );
        this.getRoleAfterLogin(this.model.userName);
        sessionStorage.setItem('userName', this.model.userName)
        this.loginService.changeLoginStatusToTrue();
        this.router.navigate(['/welcome']);

      } else {
        alert("Authentication failed.")
      }
    });
  }

    getRoleAfterLogin(userName: string): void {
      this.users.map(users => {
        if (users.userName == userName) {
          if (users.role == 'ADMIN') {
            this.loginService.setToCurrentUserId(users.id.toString());
            this.loginService.changeToCurrentUserRole('ADMIN', userName)
            sessionStorage.setItem('userName', userName)
            sessionStorage.setItem('role', 'ADMIN');
            return;
          } else {
            this.loginService.changeToCurrentUserRole('USER', userName)
            this.loginService.setToCurrentUserId(String(users.id))
            sessionStorage.setItem('userName', userName)
            sessionStorage.setItem('role', 'USER');
            return;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
