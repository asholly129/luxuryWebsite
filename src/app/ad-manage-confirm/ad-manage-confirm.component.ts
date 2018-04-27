import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CourseService } from '../service/firebase-service.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-ad-manage-confirm',
  templateUrl: './ad-manage-confirm.component.html',
  styleUrls: ['./ad-manage-confirm.component.css']
})
export class AdManageConfirmComponent implements OnInit {
  
  reserveList: any={};
  reservePath : string = '/reservation';
  reserveKey: any;

  courseList: any={};
  coursePath: string = '/course';

  userList: any={};
  userPath: string='/users';

  reservation= {
    status:''
  }
  


  c:any=[]; //reserved courses
  u:any=[]; //reserved users
  r:any=[];
  courseID:any=[];
  userID:any=[];

  constructor(private router: Router, private CourseService: CourseService,private db:AngularFireDatabase) { }

  

  ngOnInit() {
    this.reserveList = this.CourseService.getDate(this.reservePath);
    this.reserveList.subscribe(data=>{
      // console.log(data);
      let c:any=[];
      let u:any=[];
      let r:any=[];
      let key_:any=[];
      Object.keys(data).map(function(key,index) {
        key_[index] = key;
        // console.log(key);
        // console.log(data[key]);
        c[index] = data[key]['c_id'];
        u[index] = data[key]['u_id'];
        r[index] = data[key]['status'];
      });
      this.r = r;
      console.log(this.r);
      this.reserveKey = key_;
      // console.log(c[0]);
      this.courseID = c;
      this.userID = u;
      // console.log(this.courseID[1]);      
      this.getCoursesByKey();
      this.getUsersByKey();
      
    })




  
  }






  getCoursesByKey() {
    let i = 0;
    for(let c of this.courseID) {
      this.db.object(this.coursePath+'/'+c).valueChanges().subscribe(data =>{
        this.c[i] = data;
        // console.log(i,this.c[i])
        i++;
      });
      
    }
  }


  getUsersByKey() {
    let i = 0;
    for(let u of this.userID) {
      this.db.object(this.userPath+'/'+u).valueChanges().subscribe(data =>{
        this.u[i] = data;
        i++;
      });
      
    }
  }


  confirmReserve(i){
    console.log("hello")
    this.reservation.status = '1';
    console.log(this.reserveKey[i]);
    this.CourseService.updateCourse(this.reserveKey[i],this.reservation,this.reservePath);
    console.log("update success")
  }


}




