import { Component, OnInit, NgModule } from '@angular/core';
import { CourseService } from '../service/firebase-service.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import 'rxjs/add/operator/take';
import { AdManageCoursesComponent } from '../ad-manage-courses/ad-manage-courses.component';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FileUpload } from './file-upload';
import { UploadServiceService } from '../service/upload-service.service';
import { BrowserModule } from '@angular/platform-browser'
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import * as moment from 'moment';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  // C_Date = new FormControl(new Date().toISOString());
  courseDate: any = [];
  c: any;

  C_Date = {
    date:[],
    time:[],
    status:[]
  }

  Acourse = {
    C_Category: '',
    C_Date:{
      date:[],
      time:[],
      status:[]
    },
    C_Description: '',
    C_Discount: '',
    C_Institute: '',
    C_Name: '',
    C_Price: '',
    C_PriceUnit:'',
    C_Body:'',
    name: '',
    url: '',
    count: 0
  }

  course= {
    C_Category: '',
    C_Date:{
      date:[],
      time:[],
      status:[]
    },
    C_Description: '',
    C_Discount: '',
    C_Institute: '',
    C_Name: '',
    C_Price: '',
    C_PriceUnit:'',
    C_Body:'',
    name: '',
    url: '',
    count: 0
  }

  // C_Date = new Date();
  // viewDate: Date = new Date();
  // events = [];
  institute: any = {};
  title: string = "เพิ่มคอร์สเสริมความงาม";
  basePath: string = "/course";
  // basePath: string = "/course";
  id;

  selectedFiles: FileList
  currentFileUpload: FileUpload
  fileUrl: any;
  progress: { percentage: number } = { percentage: 0 }

  x: any;
  dates: any=[];
  time1: any=[];
  time2: any=[];
  itemKey:any;
  fileUploads: FirebaseListObservable<FileUpload[]>;
  newUploadFile;

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute, private router: Router,
    private CourseService: CourseService, private UploadServiceService: UploadServiceService,
    private formBuilder: FormBuilder,private datePipe : DatePipe) { }

  public orderForm: FormGroup;

  trackByIndex(index: number, value: number) {
    return index;
  }
  async addCourse(data: NgForm) {
    this.newUploadFile = true;
    let dates_temp = []

    let i = 0;
    this.course.C_Date.time.forEach(element=>{
      let temp = {
        T1: element.T1,
        T2: element.T2
      }
      console.log(temp)
      this.C_Date.time.push(temp)
      i++;
    })
    console.log(this.course.C_Date.date)
    this.course.C_Date.date.forEach(element=>{
      this.C_Date.date.push(new Date(element))
      this.C_Date.status.push("0")
    })
    // let i =0;
    
    // for(let x of this.C_Date.date){
    //   this.C_Date.time[i] = [this.datePipe.transform(data.value.C_Time1,'shortTime'),this.datePipe.transform(data.value.C_Time2,'shortTime')]
    //   alert(this.C_Date.time)
    //   i++
    // }

    console.log(this.C_Date)
    
    this.Acourse.C_Category = data.value.C_Category;
    this.Acourse.C_Description = data.value.C_Description;
    this.Acourse.C_Discount = data.value.C_Discount;
    this.Acourse.C_Institute = data.value.C_Institute;
    this.Acourse.C_Name = data.value.C_Name;
    this.Acourse.C_Price = data.value.C_Price;
    this.Acourse.C_PriceUnit = data.value.C_PriceUnit
    this.Acourse.C_Date = this.C_Date;
    this.Acourse.C_Body = data.value.C_Body
    if(this.currentFileUpload == null){
      this.Acourse.name = this.course.name
      this.Acourse.url = this.course.url
      this.newUploadFile = false;
    }

    if (this.id) {
      console.log(this.Acourse)
      await this.CourseService.updateCourse(this.id, this.Acourse, this.basePath)
      if(this.newUploadFile == true){
          await this.UploadServiceService.saveFileData(this.currentFileUpload,this.id,this.basePath)
      }
      
      // await this.upload(this.id);
      await this.goToHome()

    } else {

      console.log(this.Acourse)
      await this.CourseService.addData(this.Acourse, this.basePath).then(item => {
        // this.getCourseByKey(item.key,this.basePath)
        this.UploadServiceService.saveFileData(this.currentFileUpload,item.key,this.basePath)
        // this.upload(item.key);
      })

      await this.goToHome()
    }

  }
  goToHome = () => {
    this.router.navigate(['/ad-manage-courses']);
  }


  ngOnInit() {
    
    

    this.institute = this.CourseService.getCourseList('/institute');

    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.title = "แก้ไขคอร์สเสริมความงาม";
      this.getCourseByKey(this.id, this.basePath);
    }else {
      this.course.C_Date.date.push(new Date)
      let temp = {
        T1:new Date(),
        T2:new Date()
      }
      this.course.C_Date.time.push(temp)
    }
  }
   getCourseByKey(id, path) {

    this.db.object(path + '/' + id).valueChanges().subscribe(data => {
      console.log(data)
      let d;
      d = data;
      this.course = d;
      let i = 0;
      console.log(this.course)
      this.course.C_Date.date.forEach(element=>{
        this.course.C_Date.date[i] = new Date(element);
        // this.course.C_Date.status.push('0')
        i++
      })
     
        this.course.C_Date.time.forEach(element=>{
          element.T1 = new Date(element.T1)
          element.T2 = new Date(element.T2)
        })
      
      // // this.dates = this.course.C_Date.date
      // this.course.C_Date.date.forEach((element,index) => {
      //   this.dates[index] = new Date(element);
      // })
      
      console.log(this.course.C_Date.time)

    });

    
  }

  async getDates(a) {
    await a.forEach((element,index) => {
      this.dates[index] = new Date(element);
    })
  }

  selectFile(event) {
    // this.selectedFiles = event.target.files;
    const file = event.target.files.item(0)

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }

    
  }

  async upload() {
    console.log("upload")
    const file = await this.selectedFiles.item(0)
    this.currentFileUpload = await new FileUpload(file);
    await console.log(this.currentFileUpload)
    await this.UploadServiceService.pushFileToStorage(this.currentFileUpload, this.progress, this.basePath)
    // console.log(this.UploadServiceService.pushFileToStorage(this.currentFileUpload, this.progress,this.id,this.basePath))
  }

  // deleteFileUpload(fileUpload) {
  //   this.UploadServiceService.deleteFileUpload(fileUpload)
  // }


  getDate(a){
    let temp = {
      T1 : new Date()
      ,T2 : new Date()
    }
    console.log(temp)
    console.log(a)
    a.time.push(temp)
  }

  




}
