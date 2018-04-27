import { Component, OnInit } from '@angular/core';
import {CourseService} from '../service/firebase-service.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import 'rxjs/add/operator/take';
import { AdManageCoursesComponent } from '../ad-manage-courses/ad-manage-courses.component';
import { NgForm } from '@angular/forms';
import {FormControl} from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';  
import { BookCourseComponent } from '../book-course/book-course.component';
import { AuthServiceService } from '../service/auth-service.service';
import { ReviewratingComponent } from '../reviewrating/reviewrating.component';
import {BrowserModule} from '@angular/platform-browser'
import { ReplyCommentComponent } from '../reply-comment/reply-comment.component';


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  courseList: FirebaseListObservable<any>;
  course: any={};
  basePath:string = '/course';
  reviewPath:string = '/courseReview'
  userPath:string='/users';
  id;
  name;
  courseForm;
  user:any;

  review:any;
  reviewList:FirebaseListObservable<any>;
  review_k:any;
  reviewKey:any=[];

  keyindex:any=[]
  

  val:number = 0;
  n:number = 0;
  sum:number = 0;
  
  thisReview:any=[];
  userReview:any=[];

  userReply:any[][]= null

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute ,private router: Router,
    private CourseService: CourseService,public dialog: MatDialog,public auth: AuthServiceService,
   ) { }

  ngOnInit() {

    this.courseList = this.CourseService.getCourseList(this.basePath);
    this.reviewList = this.CourseService.getCourseList(this.reviewPath);
    this.review_k = this.CourseService.getMyKey(this.reviewPath)

    this.id = this.route.snapshot.paramMap.get("id");

    this.reviewList.subscribe(ratings=>{
      this.review = ratings;
      for(let rating of ratings) {
        if(rating.C_id == this.id){
          this.val += parseInt(rating.C_Rating);
          this.n++;
        }
      }
      this.sum = this.val/this.n;
      console.log(this.sum.toFixed(2));
      let i = 0;
      ratings.forEach((element,index)=>{
        if(element.C_id == this.id){
          this.keyindex.push(index)
          this.thisReview[i] = element
          console.log("this review here")
          console.log(this.thisReview[i])
          this.getUserData(element.C_uid,this.userPath,i)
          i++;
        }
      })
      console.log(this.thisReview)

    let j = 0;
    this.thisReview.forEach(element=>{
      console.log(element.C_Review)
      if(element.reply){
        // alert("has reply")
        let k = 0;
        element.reply.forEach(item=>{
          console.log(item)
          // alert("user ID")
          // alert(item.userID)
          this.getReplyUser(item.userID,j,k)
          k++;
          // this.userReply.push(item.userID)
        })
      }
      j++;
    })

    console.log(this.thisReview)

    })
    
    
    
    this.getCourseByKey(this.id,this.basePath);

    this.review_k.subscribe(data=>{
      data.forEach(element=>{
        this.reviewKey.push(element.key)
      })
    })


  }



  getUserData(id,path,i){
    this.db.object(path+'/'+id).valueChanges().subscribe(data =>{
      this.userReview[i] = data;
      });
  }
  getCourseByKey(id,path) : void{
    this.db.object(path+'/'+id).valueChanges().subscribe(data =>{this.course = data;});
  }

  openDialog():void{
    let dialogRef = this.dialog.open(BookCourseComponent, {
      width: '700px',
      data: {id: this.id,
             course : this.course  
            }
      // data: { name: this.name, animal: this.animal }
    });
    console.log(this.course)
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  reviewAndRating(){
    let dialogRef = this.dialog.open(ReviewratingComponent, {
      width: '700px',
      data: {id: this.id,
        course : this.course  
       }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  getUserByKey(id,path) : void{
    this.db.object(path+'/'+id).valueChanges().subscribe(data =>{this.user = data;});
  }

  replyComment(i){
        let dialogRef = this.dialog.open(ReplyCommentComponent, {
      width: '700px',
      data: {
        reviewKey: this.reviewKey[this.keyindex[i]]
       }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });

  }

  getReplyUser(id,i,j) {
    // alert("เข้าไหม?")
    let x :any;
    this.db.object(this.userPath+'/'+id).valueChanges().subscribe(data =>{
      // console.log(data)
      this.userReply[i][j] = data;
      console.log(this.userReply)
    });
  }

}