import { Component, OnInit ,ViewChild , ElementRef,NgZone} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { CourseService } from '../service/firebase-service.service';
import { AngularFireDatabase } from 'angularfire2/database';
import * as moment from 'moment';
import * as variable from 'jquery';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { ButtonModule } from 'primeng/button';
import { element } from '../../../app2/node_modules/protractor';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import { DatePipe } from '@angular/common';
import {SelectItem} from 'primeng/api';
import { DateFnsParser } from 'ng2-semantic-ui/dist';
import { } from '@types/googlemaps';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  latLng: any;
  markers: any=[];
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  marker: google.maps.Marker;
  currentLong: any;
  currentLat: any;
  public model: any = null;
  rangeValues: number[] = [0, 100000];

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 1 ? []
        : this.arr.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  model2: Date[];
  date_t1: Date;
  date_t2: Date;
  myControl: FormControl = new FormControl();
  courseList: FirebaseListObservable<any[]>;
  instituteList: FirebaseListObservable<any[]>;
  course: string = "/course";
  institute: string = "/institute";
  courseDate: any;
  c: any;
  newDate: any;
  d: any = [];
  i: any;
  l: any;
  arr: any = [];
  public courseName: any = [];
  public instituteName: any = [];

  date5: Date;
  invalidDates: Array<Date>

  showCourse: any = [];
  showInstitute: any = [];

  courseKey:any;
  showCourseKey: any=[];
  showInstituteKey: any=[]
  instituteKey:any;
  courseKey_:any=[];
  instituteKey_:any=[];

  courseType = [
    {label:'เลือกประเภทคอร์สเสริมความงาม', value:null},
    {value:1,label:'Surgery Program'},
    {value:2,label:'Treatment Program'},
    {value:3,label:'Laser Program'},
    {value:4,label:'Injection Program'},
  ]
  courseCat:any;
  body:any;
  bodyType = [
    {label:'เลือกประเภทร่างกาย' , value: null},
    {value:1,label:'ใบหน้า'},
    {value:2,label:'ตา'},
    {value:3,label:'จมูก'},
    {value:4,label:'ปาก'},
    {value:5,label:'คาง'},
    {value:6,label:'ขา'},
    {value:7,label:'อื่นๆ'},
  ]
  id;

  getCountry:any;
  country = [
    {label:'เลือกประเทศ' , value: null},
    {value:'1',label:'ไทย'},
    {value:'2',label:'เกาหลี'},
  ]

  constructor(private CourseService: CourseService, private db: AngularFireDatabase,
    private route: ActivatedRoute ,private router: Router,private datePipe : DatePipe,private ngZone: NgZone) {}

  async ngOnInit() {

    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    
    
    // this.model2 = new Date(this.datePipe.transform(this.model2,'medium'));
    console.log(this.courseType)

    this.courseList = await this.CourseService.getCourseList(this.course)
    this.instituteList = await this.CourseService.getCourseList(this.institute)
    // console.log(this.CourseService.getDate(this.course))

    this.courseKey = await this.CourseService.getMyKey(this.course);
    this.instituteKey = await this.CourseService.getMyKey(this.institute)

    this.id =  await this.route.snapshot.paramMap.get("value");
    // alert(this.id);
    if(this.id == 'eyes'){
       this.body = '2';
    }else if(this.id == 'nose'){
      this.body = '3'
    }else if(this.id == 'lip'){
      this.body = '4'
    }else if(this.id == 'chin'){
      this.body = '5'
    }else if(this.id == 'legs'){
      this.body = '6'
    }else if(this.id == 'etc'){
      this.body = '7'
    }else if(this.id == 'face'){
      this.body = '1'
    }
    // alert(this.body)
    await this.searchByType();

    let i = 0;
    this.courseKey.forEach(element=>{
      this.courseKey_[i] = element
    })
    let j = 0;
    this.instituteKey.forEach(element=>{
      element.forEach(item=>{
        this.instituteKey_[j] = item.key;
        j++;
      })
    })

    
    
    // console.log(this.courseList)

    await this.CourseService.getDate(this.course).subscribe(item => {
      let c: any = [];
      Object.keys(item).map(function (key, index) {
        c[index] = item[key]['C_Name'];
      });
      this.courseName = c;
    })

    await this.instituteList.subscribe(item => {
      let i: any = [];
      Object.keys(item).map(function (key, index) {
        i[index] = item[key]['I_Name'];
      });
      this.instituteName = i;
      this.arr = this.courseName.concat(this.instituteName);
    })
  }

  searchData() {

    console.log("i'm in searchDate");
    this.courseList.subscribe(data => {
      let i = 0;
      let j = 0;
      let index = 0;
      data.forEach(element => {
        if (this.model == element.C_Name && this.model2 == null) {
          this.showCourse[i] = element;
          this.showCourseKey[i] = this.courseKey_[index]
          i++;
        } else if (this.model == element.C_Institute && this.model2 == null) {
          this.showCourse[i] = element;
          this.showCourseKey[i] = this.courseKey_[index]
          i++;
        } else if (this.model2 != null && this.model == null) {
          this.date_t1 = new Date(this.model2[0])
          this.date_t2 = new Date(this.model2[1])
          // alert("eiei")
          element.C_Date.forEach(date => {
            if (this.datePipe.transform(this.date_t1,'medium') <= this.datePipe.transform(date,'medium') &&
            this.datePipe.transform(this.date_t2,'medium') >= this.datePipe.transform(date,'medium')) {
              let same = 0;
              for (let s of this.showCourse) {
                if (s == element) {
                  same = 1;
                  break;
                }
              }
              if (same == 0) {
                this.showCourse[i] = element;
                this.showCourseKey[i] = this.courseKey_[index]
                i++;
              }
            }
          })
        } else if (this.model != null && this.model2 != null) {
          this.date_t1 = new Date(this.model2[0])
          this.date_t2 = new Date(this.model2[1])
          // this.model2 = moment().format("MMM D YY");
          // this.datePipe.transform(this.model2,'medium')
          // alert(this.model2)
          // console.log(this.model, this.model2)
          element.C_Date.forEach(date => {
            // date = moment().format("MMM D YY");
            if (this.model == element.C_Name && this.datePipe.transform(this.date_t1,'medium') <= this.datePipe.transform(date,'medium') &&
            this.datePipe.transform(this.date_t2,'medium') >= this.datePipe.transform(date,'medium')) {
              let same = 0;
              for (let s of this.showCourse) {
                if (s == element) {
                  same = 1;
                  break;
                }
              }
              if (same == 0) {
                this.showCourse[i] = element;
                this.showCourseKey[i] = this.courseKey_[index]
                i++;
              }

            } else if (this.model == element.C_Institute && this.model2 == date) {
              let same = 0;
              for (let s of this.showCourse) {
                if (s == element) {
                  same = 1;
                  break;
                }
              }
              if (same == 0) {
                this.showCourse[i] = element;
                this.showCourseKey[i] = this.courseKey_[index]
                i++;
              }
            }
          })
        }
        this.l = i;
        index++;
      })
    })

    console.log(this.showCourseKey);
    // console.log(this.showCourseKey["0"]["0"].key)
  }



goToCourse(i){
  console.log(i);
  let j:string = i;
  console.log(this.showCourseKey["0"][j])
  this.router.navigate([`/course-detail/${this.showCourseKey["0"][j].key}`])
}

searchByPrice(){
  console.log(this.rangeValues)
  this.courseList.subscribe(data=>{
    let i = 0;
    let index = 0;
    data.forEach(element=>{
      if(element.C_Price <= this.rangeValues[1] && element.C_Price >= this.rangeValues[0]){
        // console.log("yeah!!")
        console.log(element);
        this.showCourse[i] = element;
        this.showCourseKey[i] = this.courseKey_[index]
        i++;
      }
    })
    this.l = i;
    index++;
  })
}

searchByType(){
  console.log(this.body)
  if(this.courseCat != null && this.body == null){  //ค้นหาประเภทการเสริมความงาม
    this.courseList.subscribe(data=>{
      let i = 0;
      let index = 0;
      data.forEach(element=>{
        if(element.C_Category == this.courseCat){
          this.showCourse[i] = element;
          this.showCourseKey[i] = this.courseKey_[index];
          i++;
        }
      })
      this.l = i;
      index++;
    })
  }else if(this.courseCat == null && this.body != null){
    // alert("Hey! i'm here!")
    this.courseList.subscribe(data=>{
      let i = 0;
      let index = 0;
      data.forEach(element=>{
        if(element.C_Body == this.body){
          this.showCourse[i] = element;
          this.showCourseKey[i] = this.courseKey_[index];
          i++;
        }
      })
      this.l = i;
      index++;
    })
  } else if(this.courseCat != null && this.body != null){
    this.courseList.subscribe(data=>{
      let i = 0;
      let index = 0;
      data.forEach(element=>{
        if(element.C_Category == this.courseCat && element.C_Body == this.body){
          this.showCourse[i] = element;
          this.showCourseKey[i] = this.courseKey_[index];
          i++;
        }
      })
      this.l = i;
      index++;
    })
  }
  
}

searchInstitute() { 
  // alert(this.getCountry)
    this.instituteList.subscribe(data=>{
      console.log(data)
      let i = 0;
      let index = 0;
      data.forEach(element=>{
        // alert(element.I_Country)
        if(this.getCountry == element.I_Country){
          // alert("getCountry")
          this.showCourse[i] = element;
          this.showCourseKey[i] = this.courseKey_[index];
          i++;
        }
      })
      this.l = i;
      index++;
    })

  }

  searchNearby(){
    this.showCourse = [];
    this.showCourseKey = [];
   
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }


  }

  showPosition(position) {

    let service = new google.maps.places.PlacesService(this.map);

    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    console.log(location)
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!',
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }





  createMarker(){

    console.log(this.instituteKey_)
    
    let l; 
    let locations: any=[{}]
    let temp: any=[];
    var icon = {
      url: 'https://cdn4.iconfinder.com/data/icons/ios7-active-tab/512/map_marker-512.png', // url
      scaledSize: new google.maps.Size(50, 50), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
  };
    this.instituteList.subscribe(data=>{
      temp = data;
      console.log(temp[0].I_Name)
      data.forEach(element=>{
        console.log(element.I_Latitude)
        l = new google.maps.LatLng(parseFloat(element.I_Latitude), parseFloat(element.I_Longtitude));
        locations.push(l);
      })
          let i = 0;
        for(let l of locations){
          console.log(i)
          console.log(l)
          this.markers[i] = new google.maps.Marker({
            position: l,
            map: this.map,
            title: temp[i].I_Name,
            icon: icon,
            zIndex: i
          });
          let markerInfo = temp[i].I_Name
          let index = i;
          console.log(markerInfo)
          let info = new google.maps.InfoWindow({
            content: markerInfo[i],
          })
          google.maps.event.addListener(this.markers[i], 'click', (data) => {
            console.log(data.instance)
            console.log(index)
            console.log(this.instituteKey_[index])
            alert(markerInfo)
            this.router.navigate([`/institute-detail/${this.instituteKey_[index]}`])
            return() => {
              info.setContent(markerInfo);
              info.open(this.map, this.markers[i]);
            }
          
          });
        i++;
        }
      // console.log(locations)
    })
    

    // this.markers.setPosition(this.map)
    // this.markers.setMap(this.map)
    
  }



  onTabChange(e){
    var index = e.index
    if(index == 1){
      this.searchNearby()
    }
  }





}
