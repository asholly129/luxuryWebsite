import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../service/firebase-service.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import {ConfirmationService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@Component({
  selector: 'app-ad-manage-courses',
  templateUrl: './ad-manage-courses.component.html',
  styleUrls: ['./ad-manage-courses.component.css'],
})
export class AdManageCoursesComponent implements OnInit {

  courseList: FirebaseListObservable<any[]>;
  myKey: FirebaseListObservable<any[]>;
  myKeyTemp: any;
  basePath = "/course";
  msgs = [];
  // aaa: FirebaseListObservable<any[]>;
  constructor(private router: Router, private CourseService: CourseService, private db: AngularFireDatabase,
    private confirmationService: ConfirmationService,) {
    // this.aaa = db.list('/test');
  }


  ngOnInit() {
    // this.courseList = this.db.list("/test").valueChanges();
    // let mykeyeiei = this.db.object("/test").snapshotChanges();
    // console.log("gogogaga"+mykeyeiei.key);
    this.courseList = this.CourseService.getCourseList(this.basePath);
    // console.log(this.courseList)
    this.myKey = this.CourseService.getMyKey(this.basePath);


    this.myKey.forEach(data => {
      this.myKeyTemp = data
    })
    // this.items = this.CourseService.getItemList();
    // console.log(this.courseList.source);


  }

  editCourse(data) {
    this.router.navigate([`/editCourse/${this.myKeyTemp[data].key}`]);
    // this.router.navigate(['/editCourse/${data.$key}']);
  }


  delCourse(data) {
    this.CourseService.removeCourse(this.myKeyTemp[data].key, this.basePath);
  }

  confirm(i) {
    this.confirmationService.confirm({
        message: 'ยืนยันการลบ?',
        accept: () => {
          this.delCourse(i);
          this.msgs = [{severity:'info', summary:'ยืนยัน', detail:'ลบคอร์สเรียบร้อย'}];
            //Actual logic to perform a confirmation 
          
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'ยกเลิก', detail:'ยกเลิกการลบ'}];
        }
    })

}



}
