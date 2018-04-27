import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../service/firebase-service.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-ad-report',
  templateUrl: './ad-report.component.html',
  styleUrls: ['./ad-report.component.css']
})
export class AdReportComponent implements OnInit {
    @ViewChild('content') content: ElementRef;

    institutePath:string='/institute';
    instituteList:any;
    instituteName=[];

    coursePath:string='/course'
    courseList:any;
    courseCount=[0]

  data: any;
  constructor(private CourseService: CourseService, private db: AngularFireDatabase, private router: Router) { 
    

    this.instituteList = this.CourseService.getCourseList(this.institutePath);
    this.courseList = this.CourseService.getCourseList(this.coursePath);


    this.instituteList.subscribe(item=>{
        item.forEach(element=>{
            // console.log(element.I_Name);
            this.instituteName.push(element.I_Name)
            this.courseCount.push(0)
        })
    })

    this.courseList.subscribe(item=>{
        let tmp = 0;
        item.forEach(element=>{
            this.instituteName.forEach((i_name,index)=>{
                if(i_name == element.C_Institute){
                    // tmp = element.count + tmp;
                    // console.log(i_name,tmp)
                    console.log(this.courseCount[index],element.count)
                    this.courseCount[index] = this.courseCount[index]+element.count;
                    console.log(this.courseCount[index],element.count)
                    // console.log(this.courseCount)
                    console.log(tmp,i_name)
                }
                if(index == item.length-1){
                this.data = {
                    labels: this.instituteName,
                    datasets: [
                        {
                            label: 'จำนวนผู้จอง',
                            backgroundColor: '#42A5F5',
                            borderColor: '#1E88E5',
                            data: this.courseCount
                        },
                       
                    ]
                }
        
            }
            })
            
            // this.courseCount.push(tmp);
        })
        console.log(this.courseCount)
    })





    // this.courseList.subscribe(item=>{
    //     item.forEach((element,index)=>{
    //         console.log(element.count)
    //         this.courseCount.push(element.count)

    //         if(index == item.length-1){
    //             this.data = {
    //                 labels: this.instituteName,
    //                 datasets: [
    //                     {
    //                         label: 'จำนวนผู้จอง',
    //                         backgroundColor: '#42A5F5',
    //                         borderColor: '#1E88E5',
    //                         data: this.courseCount
    //                     },
                       
    //                 ]
    //             }
        
    //         }
    //     })

    // })

    
    

  }

  ngOnInit() {
  }

  public pdfDownload(){


    // console.log(this.c1[this.courseK].C_Name);
    let img = "data:image/png;base64,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"
    
    let doc = new jsPDF();
    doc.addImage(img, 'PNG',
  85,0,50,50);
    doc.addFont('ComicSansMS', 'Tahoma', 'normal');
        doc.setFont('Tahoma');
        // doc.text(50,50,'Hello World');
    let specialElement = {
      '#editor' : function(element,renderer){
        return true;
      }
    };

    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML,15,15,{
      'width' : 190,
      'elementHandler' : specialElement
    });

    doc.save('test.pdf')

  }

  download(){
    html2canvas(document.getElementById('content')).then(function(canvas) {
        // var img = canvas.toDataURL("image/png");
        document.body.appendChild(canvas)
        var doc = new jsPDF('p','pt','a4');
        doc.addHTML(canvas,function(){
            doc.save('testCanvas.pdf');
        })
        // doc.addImage(img,'JPEG',5,20);
        
        });
  }
    

    

}
