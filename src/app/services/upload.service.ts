import { SelectionService } from './selection.service';
import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { last, concatMap, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  task: AngularFireUploadTask;
  snapshot$: Observable<any>;

  constructor(private storage: AngularFireStorage, private selectionService: SelectionService) { }

  uploadImage(file: File, userId?: string, articleId?: string, imageId?: number): Observable<string> {
    let path;
    if (userId) {
      path = 'users/' + userId + '/profilepicture';
    } else if (articleId) {
      path = 'articles/' + articleId + '/' + imageId;
    } else {
      return;
    }

    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, file);

    // this.task.percentageChanges().subscribe(loading => {
    //   this.selectionService.percentageLoading.next(loading);
    // });

    this.snapshot$ = this.task.snapshotChanges().pipe(
      last(),
      concatMap(() => ref.getDownloadURL()),
    );

    return this.snapshot$;
  }

  deleteImage(imageUrl: string): Promise<any> {
    return this.storage.storage.refFromURL(imageUrl).delete();
  }
}
