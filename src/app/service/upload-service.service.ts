import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
// import * as firebase from 'firebase';
import { FileUpload } from '../add-course/file-upload';
// import * as firebase from 'firebase';
import * as firebase from 'firebase'; // for typings
import { FirebaseApp } from 'angularfire2'; // for methods
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadServiceService {

  constructor(private db: AngularFireDatabase) {}

  // private basePath = '/course';
  fileUploads: FirebaseListObservable<FileUpload[]>;
  fileData: FileUpload;
  uploads: Observable<FileUpload[]>;
  
 
  pushFileToStorage(fileUpload: FileUpload, progress: {percentage: number},path) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${path}/${fileUpload.file.name}`).put(fileUpload.file);
 
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
      },
      (error) => {
        // fail
        console.log(error)
      },
      () => {
        // success
        fileUpload.url = uploadTask.snapshot.downloadURL
        fileUpload.name = fileUpload.file.name
        // console.log(this.fileData)
        // this.saveFileData(fileUpload,id,path)
        // console.log(fileUpload)
        // return fileUpload
      }
    );
  }

 
   saveFileData(fileUpload: FileUpload,id,path) {
    this.db.list(`${path}/`).update(id,fileUpload);
  }

  getFileUploads(path) {
    this.fileUploads = this.db.list(path);
    return this.fileUploads
  }


 
  // deleteFileUpload(fileUpload: FileUpload) {
  //   this.deleteFileDatabase(fileUpload.$key)
  //     .then(() => {
  //       this.deleteFileStorage(fileUpload.name)
  //     })
  //     .catch(error => console.log(error))
  // }
 
  // private deleteFileDatabase(key: string) {
  //   return this.db.list(`${path}/`).remove(key)
  // }
 
  // private deleteFileStorage(name: string) {
  //   const storageRef = firebase.storage().ref()
  //   storageRef.child(`${path}/${name}`).delete()
  // }

}

