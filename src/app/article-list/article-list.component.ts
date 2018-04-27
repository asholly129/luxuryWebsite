import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/firebase-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articleList;
  path:string = '/article'
  arKeys;
  arKey = [];
  constructor(private CourseService: CourseService,private router: Router,private route: ActivatedRoute,
    private db: AngularFireDatabase) { }

  ngOnInit() {
    this.articleList = this.CourseService.getCourseList(this.path);
    this.arKeys = this.CourseService.getMyKey(this.path)

    this.arKeys.forEach(element=>{
      element.forEach(item=>{
        this.arKey.push(item.key)
      })
    })

    console.log(this.arKey)
  }


  viewArticle(i){
    this.router.navigate([`/article/${this.arKey[i]}`])
  }
}
