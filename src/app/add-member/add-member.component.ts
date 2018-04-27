import { Component, OnInit } from '@angular/core';
import {CourseService} from '../service/firebase-service.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import 'rxjs/add/operator/take';
// import { AdManageMemberComponent } from './ad-manage-member/ad-manage-member.component';
import { NgForm } from '@angular/forms';
// import { AddMemberComponent } from './add-member/add-member.component';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {
  member: any={};
  title: string = "เพิ่มสมาชิก";
  basePath: string = "/member";
  id;


  constructor(private db: AngularFireDatabase, private route: ActivatedRoute ,private router: Router,
  private CourseService: CourseService) {}

  async addMember(data: NgForm){
    if(this.id) {
      await this.CourseService.updateCourse(this.id,data.value,this.basePath)
      await this.goToHome()
      
    }else{
      await this.CourseService.addCourse(data.value,this.basePath)
      await this.goToHome()
    }

    }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");

      if(this.id){
        this.title = "แก้ไขข้อมูลสมาชิก";
        this.getCourseByKey(this.id,this.basePath);
      }
  }

  getCourseByKey(id,path) :void{
    this.db.object(path+'/'+id).valueChanges().subscribe(data =>{this.member = data;});
  }

  goToHome=()=>{
    this.router.navigate(['/ad-manage-member']);
  }

}
