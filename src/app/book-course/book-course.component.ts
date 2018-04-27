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
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import {ConfirmationService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';


@Component({
  selector: 'app-book-course',
  templateUrl: './book-course.component.html',
  styleUrls: ['./book-course.component.css']
})
export class BookCourseComponent implements OnInit {

  today = new Date();
  

  date5: Date;
  invalidDates: Array<Date>
  selectedDates: Array<Date>
  

  id;
  basePath:string= '/course';
  reserve: string = '/reservation';
  userPath: string= '/users';
  course_temp:any;
  temp;
  C_Date;
  C_Time;
  courseTime;
  dataCourse: any;
  user: any={};
  userID : any={};
  courseKey :string;
  courseTemp : any={};
  data1:any;
  data2:any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  reserveKey:any;

  r = {
    c_date: '',
    c_id : '',
    u_id : '',
    status: 0,
    c_time:''
  }

  course = {
    count:0,
    status:[]
  }
  msgs: any=[];
  n = 0;
  zeroDates = [];
  zeroTime = [];

  constructor(private CourseService: CourseService,private router: Router,
  private route: ActivatedRoute , private db: AngularFireDatabase,public dialog: MatDialog,
  private _formBuilder: FormBuilder,
  private angularFireAuth:AngularFireAuth,
  private auth:AuthServiceService,
  private confirmationService: ConfirmationService,
  private datePipe : DatePipe,
  public dialogRef: MatDialogRef<BookCourseComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log("data id: "+data.id)
    this.course_temp = data.course;
    this.course.count = data.course.count;
    console.log(this.course_temp)
    // console.log(this.course_temp.C_Date);

    this.courseKey = data.id;
    this.r.c_id = data.id;
    // this.courseKey = data.id;
   }
  async ngOnInit() {

    // alert(this.datePipe.transform(this.today,'medium'))
    await this.course_temp.C_Date.date.forEach((element,index)=>{
      console.log(element)
      if(this.datePipe.transform(element,'medium') <= this.datePipe.transform(this.today,'medium')){
        this.n++
      }
    })
    await this.course_temp.C_Date.date.splice(0,this.n)
    await console.log(this.course_temp.C_Date.date)
    
    let courseDate: any=[];
    let courseDates: any=[];
    let today = new Date();

    let invalidDate = new Date();
        invalidDate.setDate(today.getDate() - 1);
        console.log(invalidDate);
        this.invalidDates = [today,invalidDate];
        // this.invalidDates[0] = today;
        // this.invalidDates[1] = invalidDate;
        // console.log(this.invalidDates[0]);
        let i = 2;
        let j = 0;
        for(let c of this.course_temp.C_Date.date){
          this.invalidDates[i] = new Date(this.course_temp.C_Date.date[j])
          i++;
          j++;
        }

        this.invalidDates = this.invalidDates.reverse();
        // console.log(courseDate)

 
    this.userID = await this.angularFireAuth.auth.currentUser.uid;
    this.r.u_id = await this.angularFireAuth.auth.currentUser.uid;
    console.log("i'm a :"+this.userID)
    await this.getUserByKey(this.userID,this.userPath)
    console.log(this.courseKey);
    await this.removeReserveDate();
    // await this.getCourseByKey(this.courseKey,this.basePath)    
    // await this.checkReserveDate()
    // console.log("cid:"+this.r.c_id)
    

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getData1(data : NgForm) {
    
    // console.log(data);
    // console.log(this.dataCourse);
  }

  getData2(data2 : NgForm) {
    console.log(this.user);
  }
  async bookCourse() {

    console.log(this.dataCourse)
    await this.course_temp.C_Date.date.forEach((element,index)=>{
      console.log(element)
      if(element == this.dataCourse){
        this.course.status[index+this.n] = '1';
        // alert("haha")
      }
    })
    // alert(this.course)

    this.r.c_date = this.dataCourse;
    this.r.c_time = this.courseTime
    console.log("date"+this.r.c_date)
    // console.log(this.userID)
    await this.CourseService.addData(this.r,this.reserve).then(item => {
      this.reserveKey = item.key;
    })
    await this.CourseService.updateCourse(this.reserveKey,this.r,this.reserve)
    this.course.count +=  1;
    await this.CourseService.updateCourse(this.courseKey,this.course,this.basePath)

    
    console.log("book course success!")
  }

  getUserByKey(id,path) :void{
    this.db.object(path+'/'+id).valueChanges().subscribe(data =>{
      this.user = data;

      // console.log(this.user.name)
    });
  }

  removeReserveDate(){
    if(!this.course_temp.status){
        // alert("if")
        // alert(this.course_temp.C_Date)
        this.course_temp.C_Date.date.forEach(element=>{
        this.course.status.push('0');
        })
        // alert(this.course.status)
      }else{
        // alert("else")
        // alert(this.course_temp.C_Date)
        this.course.status = this.course_temp.status
        // alert(this.course.status);
      }
      this.checkReserveDate();

  }

  getCourseByKey(id,path) :void{
    this.db.object(path+'/'+id).valueChanges().subscribe(data =>{
      // console.log(id);
      this.courseTemp = data;
      

      // console.log(this.user.name)
    });
  }


  async confirm() {
    await this.confirmationService.confirm({
        message: 'ยืนยันการจองคอร์ส?',
        accept: () => {
          this.bookCourse();
          this.dialogRef.close();
          this.msgs = [{severity:'info', summary:'ยืนยัน', detail:'การจองสำเร็จ'}];
          
            //Actual logic to perform a confirmation 
          
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'ยกเลิก', detail:'ยกเลิกการจอง'}];
        }
    });

}

checkReserveDate(){
  let x = [];
  // alert("checkReserveDate()")
  // alert(this.course.status)
  let i = 0;
  let temp = {}
  this.course.status.forEach((element,index)=>{
    if(element == '0'){
      this.zeroDates[i] = this.course_temp.C_Date.date[index];
      temp = {
        T1 : this.course_temp.C_Date.time[index].T1,
        T2 : this.course_temp.C_Date.time[index].T2
      }
      this.zeroTime.push(temp)
      alert(this.zeroDates[i])
      i++;
    }
  })
  // if(has == 1){
  //     for(let i = 0;i < x.length; i++){
  //       this.course_temp.C_Date.splice(this.course.status.indexOf('1')-this.n,1)
  //       this.course.status.splice(this.course.status.indexOf('1')-this.n,1)
  //       alert("alert"+i)
  //     }
  // }
  
}


}
