import { Component, OnInit } from '@angular/core';
import {CourseService} from '../service/firebase-service.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import 'rxjs/add/operator/take';
import { NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';  
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { AuthServiceService } from '../service/auth-service.service';
import { AngularFireAuth } from 'angularfire2/auth';
import {ConfirmationService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@Component({
  selector: 'app-reply-comment',
  templateUrl: './reply-comment.component.html',
  styleUrls: ['./reply-comment.component.css']
})
export class ReplyCommentComponent implements OnInit {
  reviewKey:any;
  reviewList:any;
  reviewPath:string = '/courseReview'
  replyPath:string = '/courseReview/reply'
  replyData:string;
  // courseReview = {
  //   reply:[]
  // }

  courseReview={
    reply:[]
  }
  // reply = []

  temp = {
    message:'',
    userID:''
  }

  reviewData:any;
  constructor(private CourseService: CourseService,private router: Router,
    private route: ActivatedRoute , private db: AngularFireDatabase,public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private angularFireAuth:AngularFireAuth,
    private auth:AuthServiceService,
    private authService:AuthServiceService,
    private confirmationService: ConfirmationService,
    public dialogRef: MatDialogRef<ReplyCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.reviewKey = data.reviewKey;
      alert(this.reviewKey)
    }

  async ngOnInit() {
    this.reviewList = await this.CourseService.getCourseList(this.reviewPath)
    this.temp.userID = await this.auth.currentUserId;
    await this.getData(this.reviewKey,this.reviewPath)
  }

  replyFunction(){
    alert(this.replyData)
    this.temp.message = this.replyData;
    
    alert(this.temp.message);
    console.log(this.temp)
    alert(this.temp.userID)
    // alert(this.courseReview.reply)
    alert("reply")
    // alert(this.replyData)
    this.courseReview.reply.push(this.temp)
    console.log(this.courseReview.reply)
    // alert(this.reply)
    this.CourseService.updateCourse(this.reviewKey,this.courseReview,this.reviewPath)
    alert("update success")
  }

  getData(id,path){
    this.db.object(path+'/'+id).valueChanges().subscribe(data =>{
      this.reviewData = data;
      if(this.reviewData.reply){
        alert("yeah")
        let i = 0;
        this.reviewData.reply.forEach(element=>{
          this.courseReview.reply.push(element)
          alert(this.courseReview.reply[i].message)
          i++;
        })
        
        alert("get reply")
        // alert(this.courseReview.reply[0].message)
      }
      
      });
  }

}
