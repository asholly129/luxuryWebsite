import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';
import {Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-nav-member',
  templateUrl: './nav-member.component.html',
  styleUrls: ['./nav-member.component.css']
})
export class NavMemberComponent implements OnInit {

  id;
  constructor(private AuthServiceService: AuthServiceService, private router: Router) { }

  ngOnInit() {
    this.id = this.AuthServiceService.currentUserId;
  }

  editProfile(){
    this.router.navigate([`/profile-detail/${this.AuthServiceService.currentUserId}`])
  }

  myHistory(){
    this.router.navigate([`/mem-history/${this.AuthServiceService.currentUserId}`])
    
  }
  myFavoriteCourse(){
    this.router.navigate([`/mem-fav-courses/${this.AuthServiceService.currentUserId}`])
  }

}
