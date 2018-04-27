import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { CourseService } from '../service/firebase-service.service';
import {AngularFireDatabase} from 'angularfire2/database';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-mem-fav-courses',
  templateUrl: './mem-fav-courses.component.html',
  styleUrls: ['./mem-fav-courses.component.css']
})
export class MemFavCoursesComponent implements OnInit {

  constructor(private router: Router, private auth: AuthServiceService,private CourseService:CourseService,
  private db: AngularFireDatabase) { }

  courseList: any={};
  favList: any={};
  favCourseList: any={};
  coursePath: string = '/course';
  favPath: string= '/favorite';
  courseKey: any={};
  temp : any=[];
  k:any=[]


  allCourse: any={};

  async ngOnInit() {
    this.courseList = await this.CourseService.getCourseList(this.coursePath);
    this.favList = await this.CourseService.getCourseList(this.favPath);
    this.courseKey = await this.CourseService.getMyKey(this.coursePath);

    await this.favList.subscribe(datas=>{
      // console.log(datas)
      let i = 0;
      for(let data of datas) {
        if(data.u_id == this.auth.currentUserId && data.like == true){
          this.favCourseList[i] = data.c_id;
          this.getCourseByKey(this.favCourseList[i],this.coursePath,i);
          i++;
        }
      }
    });

    
    await this.courseKey.subscribe(data=>{
      let j = 0;
      data.forEach(element=>{
        this.k[j] = element.key
        j++
      })
    })

    await console.log(this.k)

    // console.log(this.temp)


    // console.log(this.temp)

    // this.getSomething();


  }

  editProfile(){
    this.router.navigate([`/profile-detail/${this.auth.currentUserId}`])
  }
  myHistory(){
    this.router.navigate([`/mem-history/${this.auth.currentUserId}`])
  }
  myFavoriteCourse(){
    this.router.navigate([`/mem-fav-course/${this.auth.currentUserId}`])
  }


   getCourseByKey(id,path,i){
     this.db.object(path+'/'+id).valueChanges().subscribe( data =>{
       this.temp[i] = data;
    });
  }


  courseData(data){
    console.log(this.k[data])
    this.router.navigate([`/course-detail/${this.k[data]}`])
  }




}
