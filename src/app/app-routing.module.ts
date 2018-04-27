import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { InstituteComponent } from './institute/institute.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MemberManageComponent } from './member-manage/member-manage.component';
import { MemHistoryComponent } from './mem-history/mem-history.component';
import { MemFavCoursesComponent } from './mem-fav-courses/mem-fav-courses.component';
import { AdminManageComponent } from './admin-manage/admin-manage.component';
import { AdManageMemberComponent } from './ad-manage-member/ad-manage-member.component';
import { AdReportComponent } from './ad-report/ad-report.component';
import { AdManageCoursesComponent } from './ad-manage-courses/ad-manage-courses.component';
import { AdManageConfirmComponent } from './ad-manage-confirm/ad-manage-confirm.component';
import { CourseService } from './service/firebase-service.service';
import { AddCourseComponent } from './add-course/add-course.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { AuthServiceService } from './service/auth-service.service';
import { AuthGuard } from './guard/auth.guard';
import { AdManageInstituteComponent } from './ad-manage-institute/ad-manage-institute.component';
import { AddInstituteComponent } from './add-institute/add-institute.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BookCourseComponent } from './book-course/book-course.component';
import { InstituteDetailComponent } from './institute-detail/institute-detail.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { UploadServiceService } from './service/upload-service.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReviewratingComponent } from './reviewrating/reviewrating.component';
import { AddPromotionComponent } from './add-promotion/add-promotion.component';
import { AdManagePromotionComponent } from './ad-manage-promotion/ad-manage-promotion.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { ReplyCommentComponent } from './reply-comment/reply-comment.component';
import { AdminGuardGuard } from './guard/admin-guard.guard';
import { ArticleComponent } from './article/article.component';
import { ArticleListComponent } from './article-list/article-list.component';

const routes: Routes = [
  { path: 'courses', component: CoursesComponent },
  { path: 'institute', component: InstituteComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home/:value', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'member-manage', component: MemberManageComponent },
  { path: 'mem-fav-courses', component: MemFavCoursesComponent },
  { path: 'mem-fav-courses/:id', component: MemFavCoursesComponent },
  { path: 'mem-history', component: MemHistoryComponent },
  { path: 'mem-history/:id', component: MemHistoryComponent },
  { path: 'admin-manage', component: AdminManageComponent },
  { path: 'ad-manage-member', component: AdManageMemberComponent },
  { path: 'ad-report', component: AdReportComponent},
  { path: 'ad-manage-courses', component: AdManageCoursesComponent },
  { path: 'ad-manage-confirm', component: AdManageConfirmComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: 'add-member', component: AddMemberComponent },
  { path: 'add-institute', component: AddInstituteComponent },
  { path: 'ad-manage-institute', component: AdManageInstituteComponent },
  { path: 'editCourse/:id', component: AddCourseComponent },
  { path: 'editMember/:id', component: AddMemberComponent },
  { path: 'editInstitute/:id', component: AddInstituteComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'book-course', component: BookCourseComponent },
  { path: 'book-course/:id', component: BookCourseComponent },
  { path: 'institute-detail', component: InstituteDetailComponent },
  { path: 'institute-detail/:id', component: InstituteDetailComponent },
  { path: 'course-detail', component: CourseDetailComponent },
  { path: 'course-detail/:id', component: CourseDetailComponent },
  { path: 'profile-detail', component: ProfileDetailComponent },
  { path: 'profile-detail/:id', component: ProfileDetailComponent },
  { path: 'reviewrating', component: ReviewratingComponent },
  { path: 'reviewrating/:id', component: ReviewratingComponent },
  { path: 'reply-comment', component: ReplyCommentComponent },
  { path: 'reply-comment/:id', component: ReplyCommentComponent },
  { path: 'add-promotion', component: AddPromotionComponent },
  { path: 'add-promotion/:id', component: AddPromotionComponent },
  { path: 'ad-manage-promotion', component: AdManagePromotionComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'article', component: ArticleComponent },
  { path: 'article-list', component: ArticleListComponent },
  { path: 'first-page', component: FirstPageComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: '', component: FirstPageComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full'},

  

];

@NgModule({
  imports: [ CommonModule , RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})
export class AppRoutingModule { }
