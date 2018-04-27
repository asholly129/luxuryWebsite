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
  selector: 'app-reviewrating',
  templateUrl: './reviewrating.component.html',
  styleUrls: ['./reviewrating.component.css']
})
export class ReviewratingComponent implements OnInit {

  basePath = '/courseReview';
  id;
  uid;

  msgs: any=[];

  courseReview:any = {
    C_Rating: '',
    C_Review : '',
    C_id: '',
    C_uid: ''
  }


  constructor(private CourseService: CourseService,private router: Router,
    private route: ActivatedRoute , private db: AngularFireDatabase,public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private angularFireAuth:AngularFireAuth,
    private auth:AuthServiceService,
    private authService:AuthServiceService,
    private confirmationService: ConfirmationService,
    public dialogRef: MatDialogRef<ReviewratingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log("hello from review")
      this.id = data.id;
      this.uid = this.authService.currentUserId;
      this.courseReview.C_id = data.id;
      this.courseReview.C_uid = this.authService.currentUserId;
      // console.log(this.courseReview.C_uid);
      // this.courseKey = data.id;
     }

  ngOnInit() {
  }

  reviewRating(){
   
    this.CourseService.addCourse(this.courseReview,this.basePath);
    console.log(this.courseReview)
    console.log("OK!")
  }

  async confirm() {
        await this.confirmationService.confirm({
            message: 'ยืนยันการรีวิวและให้คะแนน?',
            accept: () => {
              this.reviewRating();
              this.msgs = [{severity:'info', summary:'ยืนยัน', detail:'ยืนยันการรีวิวให้คะแนนเรียบร้อย'}];
                //Actual logic to perform a confirmation 
              
            },
            reject: () => {
                this.msgs = [{severity:'info', summary:'ยกเลิก', detail:'ยกเลิกการรีวิวให้คะแนน'}];
            }
        })

  }

}
