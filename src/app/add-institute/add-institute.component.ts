import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/firebase-service.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import 'rxjs/add/operator/take';
import { NgForm } from '@angular/forms';

import { FileUpload } from '../add-course/file-upload';
import { UploadServiceService } from '../service/upload-service.service';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';


@Component({
  selector: 'app-add-institute',
  templateUrl: './add-institute.component.html',
  styleUrls: ['./add-institute.component.css']
})
export class AddInstituteComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  institute: any = {};
  title: string = "เพิ่มสถาบันเสริมความงาม";
  basePath: string = "/institute";
  id;

  selectedFiles: FileList
  currentFileUpload: FileUpload

  Acourse = {
    name:'',
    url:''
  }


  fileUrl: any;
  progress: { percentage: number } = { percentage: 0 }
  newUploadFile;


  options: any;
  overlays: any[];
  // map: google.maps.Map;
  setMap(event) {
    this.map = event.map;
}
 

  constructor(private router: Router, private db: AngularFireDatabase, private CourseService: CourseService,
    private route: ActivatedRoute, private UploadServiceService: UploadServiceService) { }


  async addInstitute(data: NgForm) {

    this.newUploadFile = true
    if(this.currentFileUpload == null){
      this.Acourse.name = this.institute.name
      this.Acourse.url = this.institute.url
      this.newUploadFile = false;
    }

    if (this.id) {
      await this.CourseService.updateCourse(this.id, data.value, this.basePath)
      if(this.newUploadFile == true){
          await this.UploadServiceService.saveFileData(this.currentFileUpload,this.id,this.basePath)
      }
      await this.goToHome()

    } else {
      await this.CourseService.addCourse(data.value, this.basePath).then(data=>{
        this.UploadServiceService.saveFileData(this.currentFileUpload,data.key,this.basePath)
      })
      
      await this.goToHome()
    }

  }

  
  ngOnInit() {
    this.options = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 12
  };
  
    let bounds = new google.maps.LatLngBounds();
    this.overlays = [
      new google.maps.Marker({position: {lat: 36.879466, lng: 30.667648}, title:"Konyaalti"}),
      new google.maps.Marker({position: {lat: 36.883707, lng: 30.689216}, title:"Ataturk Park"}),
      new google.maps.Marker({position: {lat: 36.885233, lng: 30.702323}, title:"Oldtown"}),
  ]
    this.overlays.forEach(marker => {
      bounds.extend(marker.getPosition());
  });
  setTimeout(()=> { // map will need some time to load
    this.map.fitBounds(bounds); // Map object used directly
}, 1000);

    this.id = this.route.snapshot.paramMap.get("id");

    if (this.id) {
      this.title = "แก้ไขสถาบันเสริมความงาม";
      this.getCourseByKey(this.id, this.basePath);
    }
  }

  getCourseByKey(id, path): void {
    this.db.object(path + '/' + id).valueChanges().subscribe(data => { this.institute = data; });
  }

  goToHome = () => {
    this.router.navigate(['/ad-manage-institute']);
  }

  selectFile(event) {
    // this.selectedFiles = event.target.files;
    const file = event.target.files.item(0)

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }

   async upload() {
    console.log("upload")
    const file = await this.selectedFiles.item(0)
    this.currentFileUpload = await new FileUpload(file);
    await console.log(this.currentFileUpload)
    await this.UploadServiceService.pushFileToStorage(this.currentFileUpload, this.progress, this.basePath)
    // console.log(this.UploadServiceService.pushFileToStorage(this.currentFileUpload, this.progress,this.id,this.basePath))
  }

  // deleteFileUpload(fileUpload) {
  //   this.UploadServiceService.deleteFileUpload(fileUpload)
  // }


}


