import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { switchMap } from 'rxjs/operators';
import { User } from './User';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()

export class AuthServiceService {
authState: any = null;
  userRef: AngularFireObject<any>;
  user$: Observable<User>;
  userTemp;
  
constructor(private afAuth: AngularFireAuth,private db: AngularFireDatabase,private router: Router,
  private afs: AngularFirestore,) {
      this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });

    this.user$ = this.afAuth.authState
        .switchMap(user => {
          if (user) {
            this.userTemp = user
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            return Observable.of(null)
          }
        })
    
  }

  get authenticated(): boolean {
      return this.authState !== null;
    }
  get currentUser(): any {
      return this.authenticated ? this.authState : null;
    }
  get currentUserObservable(): any {
      return this.afAuth.authState
    }
  get currentUserId(): string {
      return this.authenticated ? this.authState.uid : '';
    }
  get currentUserAnonymous(): boolean {
      return this.authenticated ? this.authState.isAnonymous : false
    }
  get currentUserDisplayName(): string {
      if (!this.authState) {
        return 'Guest'
      } else if (this.currentUserAnonymous) {
        return 'Anonymous'
      } else {
        return this.authState['displayName'] || 'User without a Name'
      }
    }


  googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      return this.socialSignIn(provider);
    }

  private socialSignIn(provider) {
      return this.afAuth.auth.signInWithPopup(provider)
        .then((credential) => {
          console.log(credential.user);
          this.authState = credential.user
          this.updateUserData()
          this.router.navigate(['/'])
        })
        .catch(error => console.log(error));
    }
  anonymousLogin() {
      return this.afAuth.auth.signInAnonymously()
        .then((user) => {
          this.authState = user
          this.router.navigate(['/'])
        })
        .catch(error => console.log(error));
    }
  emailSignUp(email: string, password: string) {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
          this.authState = user
          this.updateUserData()
          this.router.navigate([`/profile-detail/${this.currentUserId}`])
        })
        .catch(error => console.log(error));
    }
  emailLogin(email: string, password: string) {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          this.authState = user
          this.updateUserData()
          this.router.navigate(['/'])
        })
        .catch(error => console.log(error));
    }
  resetPassword(email: string) {
      const fbAuth = firebase.auth();
  return fbAuth.sendPasswordResetEmail(email)
        .then(() => console.log('email sent'))
        .catch((error) => console.log(error))
    }
  getCurrentLoggedIn() {
      this.afAuth.authState.subscribe(auth => {
        if (auth) {
          this.router.navigate(['/'])
        }
      });
    }
  signOut(): void {
      this.afAuth.auth.signOut();
      this.router.navigate(['/'])
    }
  private updateUserData(): void {
      const path = `users/${this.currentUserId}`; // Endpoint on firebase
      console.log("current user ID : "+this.currentUserId)
      const userRef: AngularFireObject<any> = this.db.object(path);
  const User = {
        email: this.authState.email,
        name: this.authState.displayName,
        roles : {
          member: true
        }
      }
  userRef.update(User)
        .catch(error => console.log(error));
  }
    ///// Role-based Authorization //////
    canRead(user: User): boolean {
      const allowed = ['admin', 'general', 'member']
      return this.checkAuthorization(user, allowed)
    }
  
    canEdit(user: User): boolean {
      const allowed = ['admin']
      return this.checkAuthorization(user, allowed)
    }

    canReserve(user: User): boolean {
      const allowed = ['member']
      return this.checkAuthorization(user, allowed)
    }
  
    canDelete(user: User): boolean {
      const allowed = ['admin']
      return this.checkAuthorization(user, allowed)
    }

     // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if ( user.roles[role] ) {
        return true
      }
    }
    return false
  }
  


}