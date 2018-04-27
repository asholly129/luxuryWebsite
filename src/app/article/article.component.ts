import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/firebase-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  id;
  article;
  path:string='/article'
  constructor(private CourseService: CourseService,private router: Router,private route: ActivatedRoute,
  private db: AngularFireDatabase) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getArticleByKey()
  }

  getArticleByKey(){
    this.db.object(this.path+'/'+this.id).subscribe(data=>{
      this.article = data;
      console.log(this.article)
    })
  }

}
