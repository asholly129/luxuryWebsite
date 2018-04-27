import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../service/firebase-service.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-ad-manage-promotion',
  templateUrl: './ad-manage-promotion.component.html',
  styleUrls: ['./ad-manage-promotion.component.css']
})
export class AdManagePromotionComponent implements OnInit {

  basePath: string= "/article";
  articleList: any;
  articleKey: any;

  myKey: any = [];
  

  constructor(private router: Router, private CourseService: CourseService, private db: AngularFireDatabase) { }

  ngOnInit() {

    this.articleList = this.CourseService.getCourseList(this.basePath);
    this.articleKey = this.CourseService.getMyKey(this.basePath)

    let i = 0;
    this.articleKey.forEach(element=>{
      element.forEach(item=>{
        this.myKey[i] = item.key;
        i++;
      })
    })
    
  }

  editCourse(data) {
    this.router.navigate([`/editCourse/${this.myKey[data]}`]);
  }


  delCourse(data) {
    this.CourseService.removeCourse(this.myKey[data], this.basePath);
  }

}
