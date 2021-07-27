import { Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {RegisterInterface} from "../register/register.interface";
import {UserInterface} from "./user.interface";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = environment.apiURL;
  private registerNewUserUrl = this.baseUrl + "register-user";
  private registerNewAdminUrl = this.baseUrl + "register-admin";
  private getLoggedPersonInRoleUrl = this.baseUrl + "find-all-users";

  private isLoggedSource = new BehaviorSubject('false');
  currentLoggedStatus = this.isLoggedSource.asObservable();

  private currentUserRole = new BehaviorSubject('');
  currentUserRoleStatus = this.currentUserRole.asObservable();

  private currentUserName = new BehaviorSubject('');
  currentUserNameStatus = this.currentUserName.asObservable();

  private currentUserId = new BehaviorSubject('');
  currentUserIdStatus = this.currentUserId.asObservable();

  constructor(private http: HttpClient) {
  }

  setToCurrentUserId(id: string) {
    this.currentUserId.next(id);
    sessionStorage.setItem("userId", id);
  }

  changeToCurrentUserRole(role: string, userName: string) {
    this.currentUserName.next(userName);
    this.currentUserRole.next(role);
    sessionStorage.setItem('role', role)
    sessionStorage.setItem('userName', userName)
  }

  changeLoginStatusToTrue() {
    this.isLoggedSource.next('true');
    sessionStorage.removeItem('isLogged')
    sessionStorage.setItem('isLogged', 'true');
  }

  changeLoginStatusToFalse() {
    this.isLoggedSource.next('false');
    this.currentUserRole.next("GUEST")
    sessionStorage.removeItem('isLogged')
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('userName')
    sessionStorage.setItem('isLogged', 'false');
  }

  public getAllUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(this.getLoggedPersonInRoleUrl)
  }

  public registerUser(newUser: RegisterInterface) {
    return this.http.post<RegisterInterface>(this.registerNewUserUrl, newUser);
  }

  public registerAdmin(newUser: RegisterInterface) {
    return this.http.post<RegisterInterface>(this.registerNewAdminUrl, newUser);
  }
}
