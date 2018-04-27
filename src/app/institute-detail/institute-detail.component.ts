import { Component, OnInit } from '@angular/core';
import {CourseService} from '../service/firebase-service.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import 'rxjs/add/operator/take';
import { NgForm } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { NgIf } from '@angular/common';

import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-institute-detail',
  templateUrl: './institute-detail.component.html',
  styleUrls: ['./institute-detail.component.css']
})
export class InstituteDetailComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  id;
  basePath:string = '/institute';
  institute: any={};
  instituteList;
  courseList;
  courseID;

  lat:number;
  long:number;

  options = {
    center: {lat: 15.8700, lng: 100.9925},
    zoom: 3
    };

  overlays = [];

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute ,private router: Router,
    private CourseService: CourseService) { }

   ngOnInit() {   

    this.courseList =  this.CourseService.getCourseList('/course')
    this.courseID =  this.CourseService.getMyKey('/course')
    // this.instituteList = this.CourseService.getCourseList(this.basePath)
    this.id =  this.route.snapshot.paramMap.get("id");

      this.db.object(this.basePath+'/'+this.id).valueChanges().subscribe(item =>{
      this.institute = item; 
      this.lat = parseFloat(this.institute.I_Latitude)
      this.long = parseFloat(this.institute.I_Longtitude)
  
      this.options.center.lat += this.lat;
      this.options.center.lng += this.long;
      console.log(this.options)
      document.getElementById("gmap").setAttribute('options',this.options.toString())
      this.overlays =  [
        new google.maps.Marker({position: {lat: this.lat, lng: this.long}, title:this.institute.I_Name}),
      ];


     this.courseID.forEach(data => {
      this.courseID = data
    })
      })

      

      // this.options =  {
      
      //   center: {lat: 11.0000, lng: 12.0000},
      //   zoom: 12
      //   };

      //   // this.overlays =  [
      //   //   new google.maps.Marker({position: {lat: 11.0000, lng: 12.0000}, title:"Konyaalti"}),
      //   // ];
 
  //  await alert("before")
  //  await alert(this.lat)
  //  this.options = await {
  //    center: {lat: this.lat, lng: this.long},
  //    zoom: 12
  //    };
  //    await alert("after1")
  //  this.overlays =  [
  //  new google.maps.Marker({position: {lat: this.lat, lng: this.long}, title:"Konyaalti"}),
  //  ];
  //  await alert("after2")
//    this.options = {
//     center: {lat: this.institute.I_Latitude, lng: this.institute.I_Longtitude},
//     zoom: 12
//     };
// this.overlays = await [
//   new google.maps.Marker({position: {lat: this.institute.I_Latitude, lng: this.institute.I_Longtitude}, title:"Konyaalti"}),
// ];

    

    // await this.courseID.forEach(data => {
    //   this.courseID = data
    // })
  }

  getInstituteByKey() {
     this.db.object(this.basePath+'/'+this.id).valueChanges().subscribe(institute =>{
        this.institute = institute;
        return this.institute
     })
  }


  clickCourseDetail(data) {
    this.router.navigate([`/course-detail/${this.courseID[data].key}`])
  }

}