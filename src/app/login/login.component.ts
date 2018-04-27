import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
// import { setTimeout } from 'timers';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Observable<firebase.User>;
  inputEmail: '';
  inputPassword: '';

  userPath: string='/users'
  u:any;

  private userData = {
    uid: null,
    email: null,
  }

  constructor(private firebaseAuth: AngularFireAuth,private router: Router, private db:AngularFireDatabase) {
    this.user = firebaseAuth.authState;
   }

  ngOnInit() {
  }

  async login(){
    let a;
    const authC = this;
    if(this.inputEmail && this.inputPassword) {
      await this.firebaseAuth.auth
      .signInWithEmailAndPassword(this.inputEmail,this.inputPassword)
      .then(value => {
        setTimeout(() => {
          authC.userData.email = value.email;
          authC.userData.uid = value.uid;
          this.db.object(this.userPath+'/'+authC.userData.uid).valueChanges().subscribe(data=>{
            this.u = data;
            console.log(this.u.roles)
            if(this.u.roles.admin){
              this.router.navigate(['/ad-report']);
            }else{
              this.router.navigate(['/first-page']);
            }
          })
          console.log('log in success!');
        },100);
      })
      .catch(err => {
        console.log('something went wrong!',err.messege);
        console.log(err);
      })
      // await console.log(this.u)
      // await this.router.navigate(['/first-page']);
    }
  }


  getUserData(id){
    this.db.object(this.userPath+'/'+id).valueChanges().subscribe(data=>{
      this.u = data;
    })
  }

}
