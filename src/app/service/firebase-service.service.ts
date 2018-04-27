import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { NgForm } from '@angular/forms';
import { FileUpload } from '../add-course/file-upload';


@Injectable()
export class CourseService {

   // basePath: string = "/course";

  // courseList: FirebaseListObservable<any[]>;
  // myKey: FirebaseListObservable<any[]>;
  courseList: any;
  myKey: any;
  item: any={};
  courseDate: any={};
  constructor(private db:AngularFireDatabase) {
  }

  getCourseList(path): any{
  this.courseList = this.db.list(path).valueChanges();
  return this.courseList;
  }

  getDate(path): any{
    this.courseList = this.db.object(path).valueChanges();
    return this.courseList;
  }


  getMyKey(path): any{
  // this.courseList = this.db.list('/test').valueChanges();
  this.myKey = this.db.list(path).snapshotChanges();
  // console.log("djf;sdkfj");
  // console.log(this.myKey);
  return this.myKey;
  }

  getCourseByKeyID(id,path) {
    this.db.object(path+'/'+id).valueChanges().subscribe(data =>{this.courseList = data;});
  }

  // private saveFileData(fileUpload: FileUpload,id) {
  //   this.db.list(`${this.basePath}/`).update(id,fileUpload);
  // }

  // addCourse1(data: NgForm,path,fileUpload: FileUpload,id): any{

  //   this.db.list(path).push(data);
  //   return this.db.list(`${path}/`).update(id,fileUpload);

  // }
  addCourse(data: NgForm,path): any{

    return this.db.list(path).push(data);

  }

  addData(data,path): any{

    return this.db.list(path).push(data);
  }

  addTime(data,path): any{

    return this.db.list(path).push(data);
  }

  removeCourse(id,path) : void{
    this.db.list(path).remove(id);
  }

  updateCourse(id,data,path) : any  {
    return this.db.list(path).update(id,data)
  }

  getBodyType(data) : any{
    return data;
  }




}
