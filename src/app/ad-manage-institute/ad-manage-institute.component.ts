import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../service/firebase-service.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-ad-manage-institute',
  templateUrl: './ad-manage-institute.component.html',
  styleUrls: ['./ad-manage-institute.component.css']
})
export class AdManageInstituteComponent implements OnInit {

  instituteList: any;
  myKey: any;
  myKeyTemp: any;
  basePath = '/institute'

  constructor(private CourseService: CourseService, private db: AngularFireDatabase, private router: Router) { }

  ngOnInit() {

    this.instituteList = this.CourseService.getCourseList(this.basePath);
    this.myKey = this.CourseService.getMyKey(this.basePath);


    this.myKey.forEach(data => {
      this.myKeyTemp = data
    })

  }

  editInstitute(data) {
    this.router.navigate([`/editInstitute/${this.myKeyTemp[data].key}`]);
  }


  delInstitute(data) {
    this.CourseService.removeCourse(this.myKeyTemp[data].key,this.basePath);
  }

  }

