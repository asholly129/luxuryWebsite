import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule} from '@angular/forms';
import { AngularFireModule} from 'angularfire2';
import { ReactiveFormsModule} from '@angular/forms';
import { environment } from './../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
// import  { AngularFirestore  } from "angularfire2/firestore";

import { HttpModule } from '@angular/http';
import { HttpClientModule,HttpClient } from '@angular/common/http';

import { firebaseConfig } from './../environments/firebase.config';


import { AppComponent } from './app.component';
import { SuiModule } from 'ng2-semantic-ui';
import { AppRoutingModule } from './/app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { InstituteComponent } from './institute/institute.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MemberManageComponent } from './member-manage/member-manage.component';
import { MemFavCoursesComponent } from './mem-fav-courses/mem-fav-courses.component';
import { MemHistoryComponent } from './mem-history/mem-history.component';
import { AdminManageComponent } from './admin-manage/admin-manage.component';
import { AdManageMemberComponent } from './ad-manage-member/ad-manage-member.component';
import { AdManageCoursesComponent } from './ad-manage-courses/ad-manage-courses.component';
import { AdManageConfirmComponent } from './ad-manage-confirm/ad-manage-confirm.component';
import { AdReportComponent } from './ad-report/ad-report.component';
import { CourseService } from './service/firebase-service.service';
import { AddCourseComponent } from './add-course/add-course.component';
import { AddMemberComponent } from './add-member/add-member.component';

import { AuthServiceService } from './service/auth-service.service';
import { NotifyService } from './service/notify.service';
import { AuthGuard } from './guard/auth.guard';
import { AdManageInstituteComponent } from './ad-manage-institute/ad-manage-institute.component';
import { AddInstituteComponent } from './add-institute/add-institute.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BookCourseComponent } from './book-course/book-course.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,
   MatAutocompleteModule,MatNativeDateModule,MatFormFieldModule,
   MatInputModule,MatRippleModule,MatOptionModule,MatSelectModule,
  MatStepperModule,MatIconModule,MatToolbarModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { InstituteDetailComponent } from './institute-detail/institute-detail.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { UploadServiceService } from './service/upload-service.service';
// import { CalendarModule } from 'angular-calendar';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';

import { AngularFireStorageModule } from 'angularfire2/storage';
import { SidebarComponent } from './sidebar/sidebar.component';

//bootstrap
import {NgbModule,NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { StarRatingModule } from 'angular-star-rating';

//ngprime
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';                 //api
import {RatingModule} from 'primeng/rating';
import {ButtonModule} from 'primeng/button';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {EditorModule, SharedModule, MessagesModule, GrowlModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/calendar';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ChartModule} from 'primeng/chart';
import {SliderModule} from 'primeng/slider';
import {TabViewModule} from 'primeng/tabview';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {GMapModule} from 'primeng/gmap';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReviewratingComponent } from './reviewrating/reviewrating.component';
import { NavMemberComponent } from './nav-member/nav-member.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ReadReviewComponent } from './read-review/read-review.component';
import { NavAdminComponent } from './nav-admin/nav-admin.component';


//pdf
// import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ExportPdfComponent } from './export-pdf/export-pdf.component';
import { AddPromotionComponent } from './add-promotion/add-promotion.component';
import { AdManagePromotionComponent } from './ad-manage-promotion/ad-manage-promotion.component';
import { FirstPageComponent } from './first-page/first-page.component';
// import { GridModule } from '@progress/kendo-angular-grid';
import { DatePipe } from '@angular/common';
import { ReplyCommentComponent } from './reply-comment/reply-comment.component';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AdminGuardGuard } from './guard/admin-guard.guard';
import { ArticleComponent } from './article/article.component';
import { ArticleListComponent } from './article-list/article-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    InstituteComponent,
    HomeComponent,
    LoginComponent,
    MemberManageComponent,
    MemFavCoursesComponent,
    MemHistoryComponent,
    AdminManageComponent,
    AdManageMemberComponent,
    AdManageCoursesComponent,
    AdManageConfirmComponent,
    AdReportComponent,
    AddCourseComponent,
    AddMemberComponent,
    AdManageInstituteComponent,
    AddInstituteComponent,
    SignupComponent,
    NavbarComponent,
    BookCourseComponent,
    InstituteDetailComponent,
    CourseDetailComponent,
    ProfileDetailComponent,
    SidebarComponent,
    ReviewratingComponent,
    NavMemberComponent,
    ConfirmDialogComponent,
    ReadReviewComponent,
    NavAdminComponent,
    ExportPdfComponent,
    AddPromotionComponent,
    AdManagePromotionComponent,
    FirstPageComponent,
    ReplyCommentComponent,
    ArticleComponent,
    ArticleListComponent,
    
  ],
  imports: [
    BrowserModule,
    SuiModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatOptionModule,
    MatStepperModule,
    MatGridListModule,
    MatIconModule,
    AngularFireStorageModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule,
    ButtonModule,
    AngularFontAwesomeModule,
    StarRatingModule.forRoot(),
    RatingModule,
    AlertModule.forRoot(),
    MatToolbarModule,
    ConfirmDialogModule,
    GrowlModule,
    SharedModule,
    EditorModule,
    MessagesModule,
    CalendarModule,
    ToggleButtonModule,
    NgbModule.forRoot(),
    MatButtonToggleModule,
    ChartModule,
    NgbTypeaheadModule,
    SliderModule,
    TabViewModule,
    DropdownModule,
    InputTextModule,
    GMapModule,
    // ButtonsModule,
    // GridModule,
    // CalendarModule.forRoot(),
  ],
  providers: [ConfirmationService,CourseService,AuthServiceService,NotifyService,AuthGuard,UploadServiceService,AngularFireDatabase,
    DatePipe,AngularFirestore,AdminGuardGuard],
  // providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
