import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CourseService } from '../service/firebase-service.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-institute',
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.css']
})
export class InstituteComponent implements OnInit {

  myKeyTemp: any;
  myKey: any;
  instituteList: FirebaseListObservable<any[]>;
  basePath = "/institute";

  constructor(private router: Router, private CourseService: CourseService,private db:AngularFireDatabase,
    private auth: AuthServiceService) { }

  ngOnInit() {
    
    this.myKey = this.CourseService.getMyKey(this.basePath);
    this.instituteList = this.CourseService.getCourseList(this.basePath);
    // console.log(this.courseList);

    this.myKey.forEach(data => {
      this.myKeyTemp = data
    })

  }

  instituteDetail(data): void{
    console.log(this.myKeyTemp[data].key)
    this.router.navigate([`/institute-detail/${this.myKeyTemp[data].key}`]);
  }


}
