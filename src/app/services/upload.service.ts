import { SelectionService } from './selection.service';
import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { last, concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  task: AngularFireUploadTask;
  snapshot$: Observable<any>;

  constructor(private storage: AngularFireStorage, private selectionService: SelectionService) { }

  uploadImage(file: File, userId: string): Observable<any> {
    const path = 'users/' + userId + '/profilepicture';
    // const path = `test/${Date.now()}_${file.name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, file);

    this.task.percentageChanges().subscribe(loading => {
      this.selectionService.percentageLoading.next(loading);
    });

    this.snapshot$ = this.task.snapshotChanges().pipe(
      last(),
      concatMap(() => ref.getDownloadURL())
    );

    return this.snapshot$;
  }
}
