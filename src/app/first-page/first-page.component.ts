import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CourseService } from '../service/firebase-service.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { AuthServiceService } from '../service/auth-service.service';
import { ActivatedRoute } from '@angular/router/src/router_state';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/take';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {

  coursePath:string="/course"
  courseList:FirebaseListObservable<any[]>;
  lastCourse:any=[];
  course:any=[];
  courseKeys:any;
  courseKey:any=[];
  lastKey:any=[];

  articleList:any;
  arKeyTemp:any=[]
  arKey:any=[];
  arPath:string='/article'

  userList:any;
  userPath:string= '/users'
  
  constructor(private router: Router, private CourseService: CourseService,private db:AngularFireDatabase,
    private auth: AuthServiceService,private angularFireAuth:AngularFireAuth,config: NgbCarouselConfig, private _http: HttpClient) { 
        config.interval = 10000;
        config.wrap = false;
        config.keyboard = false;
    }

  async ngOnInit() {
    
    this.courseList = await this.CourseService.getCourseList(this.coursePath);
    this.courseKeys = await this.CourseService.getMyKey(this.coursePath)
    this.articleList = await this.CourseService.getCourseList(this.arPath);
    // await this.getUserByKey()
    let i = 0;
    await this.courseList.subscribe(data=>{
      data.forEach(element=>{
        this.course[i] = element;
        i++;
      })
     this.swapCourse(i);
    })

    await this.courseKeys.subscribe(data=>{
      let i = 0;
      data.forEach(element=>{
        this.courseKey[i] = element.key;
        i++;
      })
      this.swapCourse(i);
    })
    console.log(this.lastKey)
    
    await this.getArticleList()
  }

  swapCourse(data){
    let i = 0;
    for(let n = data-1; n >= 0 ; n--){
      this.lastCourse[i] = this.course[n]
      this.lastKey[i] = this.courseKey[n]
      if(i == 4){
        break
      }
      i++;
    }
  }

  getArticleList(){
    
    this.arKeyTemp = this.CourseService.getMyKey(this.arPath)

    this.articleList.subscribe(data=>{
      console.log(data);
    })
    let i = 0;
    this.arKeyTemp.forEach(element=>{
      element.forEach(item=>{
        this.arKey[i] = item.key;
        console.log(this.arKey[i])
        i++;
      })
      
    })
    
  }

  searchEye(){
    let data = 1;
  }

  getUserByKey(){
    this.db.object(this.userPath+'/'+`${this.auth.currentUserId}`).valueChanges().subscribe(data=>{
      this.userList = data
      console.log(this.userList[this.auth.currentUserId])
    })
  }



}
