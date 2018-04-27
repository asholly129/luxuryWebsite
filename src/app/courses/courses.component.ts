import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CourseService } from '../service/firebase-service.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { AuthServiceService } from '../service/auth-service.service';
import { ActivatedRoute } from '@angular/router/src/router_state';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  favListData: any;
  favorite = {
    like: false,
    u_id:'',
    c_id:'',
    status: '0'
  };

  // like: false;

  likeID:any;
  courseID: any;
  myKeyTemp: any=[];
  myKey: any;
  courseList: FirebaseListObservable<any[]>;
  basePath = "/course";
  favPath = "/favorite";
  userPath = "/users";
  course:any;
  favKey:any=[];
  favList: any=[];

  favData:any=[];
  myFavKey:any=[];
  favTemp:any;
  button_:any=[];
  courseLiked:any=[];

  equal:any = 1;
  


  constructor(private router: Router, private CourseService: CourseService,private db:AngularFireDatabase,
    private auth: AuthServiceService,private angularFireAuth:AngularFireAuth,) { }

  async ngOnInit() {

    this.myKey = await this.CourseService.getMyKey(this.basePath);
    this.favKey = await this.CourseService.getMyKey(this.favPath);
    this.courseList = await this.CourseService.getCourseList(this.basePath);
    this.favList = await this.CourseService.getCourseList(this.favPath);

    let j = 0;
    await this.myKey.subscribe(data=>{
      data.forEach(element=>{
        this.myKeyTemp[j] = element.key
        this.courseLiked[j] = false;
        j++;
      })
    })

    

    this.reload();
    
    

    


  }

  bookCourse(data): void{
    console.log(this.myKeyTemp[data])
    this.courseID = this.myKeyTemp[data];
    this.router.navigate([`/course-detail/${this.myKeyTemp[data]}`]);
  }

  async myFavCourse(data) {
    
    // this.favorite.u_id = this.angularFireAuth.auth.currentUser.uid;
    this.courseID = this.myKeyTemp[data];
    this.favorite.c_id = this.courseID; 
    this.favorite.u_id = this.auth.currentUserId;

    this.equal = 0;
    this.favData.forEach(element=>{
      // alert(element.c_id + "<<fav   curr>>" + this.courseID)
      if(element.c_id == this.courseID){
        this.favorite.like = element.like
        this.equal = 1;
      }
    })

    if(this.equal == 0){
      // alert("add!!!")
      this.favorite.like = true;
      await this.CourseService.addData(this.favorite,this.favPath)
      // await this.reload();

     
    }else if(this.equal == 1){
      // alert("not add!!!")
      // alert(this.favorite.like);
      this.favorite.like = !this.favorite.like;
      await this.CourseService.updateCourse(this.myFavKey[data],this.favorite,this.favPath)
      // await this.reload();
      
    }

  }



  

 reload(){
   this.favList.subscribe(data=>{
      // console.log(data);
      let i = 0;
      data.forEach(element=>{
        this.favData[i] = element;
        i++;
        let j = 0;
        this.myKeyTemp.forEach(k=>{
          if(k == element.c_id){
            if(element.u_id == this.angularFireAuth.auth.currentUser.uid){
              this.courseLiked[j] = element.like
            }
          }
          j++;
        })
        
      })
        let l = 0;
     this.favKey.subscribe(data=>{
      data.forEach(element=>{
        this.myFavKey[l] = element.key
        l++;
      })
    })
      // console.log(this.courseLiked);
    })

  
}

}

