import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, NgForm, FormGroupDirective, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import {CourseService} from '../service/firebase-service.service';
import { AuthServiceService } from '../service/auth-service.service';
import { auth } from 'firebase/app';
import 'rxjs/add/operator/take';
// import {Message,SelectItem} from '../../../components/common/api';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  user:any={};
  id;
  // email = new FormControl('', [Validators.required, Validators.email]);

  name = new FormControl('',[Validators.required]);
  lastName = new FormControl('',[Validators.required]);
  tel = new FormControl('',[Validators.required]);
  address = new FormControl('',[Validators.required]);

  basePath: string = '/users';


  constructor(private db: AngularFireDatabase, private route: ActivatedRoute ,private router: Router,
    private CourseService: CourseService, private auth: AuthServiceService) { }

    
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    // console.log("this id: "+this.id);
    this.getCourseByKey(this.id,this.basePath)

  }

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' :
    this.lastName.hasError('required') ? 'You must enter a value' :
    this.tel.hasError('required') ? 'You must enter a value' :
    this.address.hasError('required') ? 'You must enter a value' :
            '';
  }

  updateProfile(data : NgForm) {
    console.log(data.value)
    this.CourseService.updateCourse(this.id,data.value,this.basePath)
    console.log("update profile success!")
  }

  getCourseByKey(id,path) :void{
    this.db.object(path+'/'+id).valueChanges().subscribe(data =>{this.user = data;});
  }

}
