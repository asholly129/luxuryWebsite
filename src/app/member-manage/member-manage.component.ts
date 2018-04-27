import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/firebase-service.service';
import { AuthServiceService } from '../service/auth-service.service';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/take';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-member-manage',
  templateUrl: './member-manage.component.html',
  styleUrls: ['./member-manage.component.css']
})
export class MemberManageComponent implements OnInit {

  userPath:string='/users';
  userID:any;
  user:any;

  constructor(private CourseService: CourseService,private angularFireAuth:AngularFireAuth,
    private auth:AuthServiceService,private route: ActivatedRoute,private db: AngularFireDatabase,
  private router: Router) { }

  ngOnInit() {

    this.userID = this.auth.currentUserId;
    this.getCourseByKey(this.userID,this.userPath)

  }
  getCourseByKey(id,path) : void{
    this.db.object(path+'/'+id).valueChanges().subscribe(data =>{
      this.user = data;
      console.log(this.user);
    });
  }


}


