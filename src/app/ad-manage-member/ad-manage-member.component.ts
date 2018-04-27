import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { CourseService } from '../service/firebase-service.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-ad-manage-member',
  templateUrl: './ad-manage-member.component.html',
  styleUrls: ['./ad-manage-member.component.css']
})
export class AdManageMemberComponent implements OnInit {

  memberList: FirebaseListObservable<any[]>;
  myKey: FirebaseListObservable<any[]>;
  myKeyTemp : any;
  basePath = "/users";

  constructor(private router: Router, private CourseService: CourseService,private db:AngularFireDatabase) { }

  ngOnInit() {

    this.memberList = this.CourseService.getCourseList(this.basePath);
    this.myKey = this.CourseService.getMyKey(this.basePath);

    this.myKey.forEach(data => {
      this.myKeyTemp = data;
    })

  }

  editMember(data) {
    this.router.navigate([`/editMember/${this.myKeyTemp[data].key}`]);
  }
  delMember(data) {
    this.CourseService.removeCourse(this.myKeyTemp[data].key,this.basePath);
  }

}
