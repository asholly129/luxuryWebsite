import { Component, OnInit } from '@angular/core';
import {CourseService} from '../service/firebase-service.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import 'rxjs/add/operator/take';
import { NgForm } from '@angular/forms';

import { FileUpload } from '../add-course/file-upload';
import { UploadServiceService } from '../service/upload-service.service';

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.css']
})
export class AddPromotionComponent implements OnInit {

  actText: string;
  atcTitle: string;
  title: string = "เพิ่มบทความ";

  basePath: string = "/article"
  articleList: any;
  id;

  article: any;

  constructor(private router: Router,private db: AngularFireDatabase, private CourseService: CourseService,
    private route: ActivatedRoute, private UploadServiceService:UploadServiceService) { }


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");

    if (this.id) {
      this.title = "แก้ไขบทความ";
      this.getCourseByKey(this.id, this.basePath);
    }
  }


  async addArticle(data: NgForm) {
    if (this.id) {
      await this.CourseService.updateCourse(this.id, data.value, this.basePath)
      await this.goToHome()

    } else {
      await this.CourseService.addCourse(data.value, this.basePath)
      await this.goToHome()
    }

  }

  getCourseByKey(id, path): void {
    this.db.object(path + '/' + id).valueChanges().subscribe(data => { this.article = data; });
  }

  goToHome = () => {
    this.router.navigate(['/ad-manage-promotion']);
  }

}
