import {Injectable} from "@angular/core";
import {LoginService} from "../login/login.service";
import {Observable} from "rxjs";
import {UserInterface} from "../login/user.interface";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  pageTitle = sessionStorage.getItem('userName');

  constructor(private loginService: LoginService) {}

  public getUser(id: number): Observable<UserInterface | undefined> {
    return this.loginService.getAllUsers()
      .pipe(
        map((users: UserInterface[]) => users.find(p => p.id === id))
      );
  }
}
