import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileService} from "./profile.service";
import {UserInterface} from "../login/user.interface";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UserInterface | undefined;
  errorMessage = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private profileService: ProfileService) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProfile(id);
    }
  }

  getProfile(id: number): void {
    this.profileService.getUser(id).subscribe({
      next: user => this.user = user,
      error: err => this.errorMessage = err
    });
  }

}
