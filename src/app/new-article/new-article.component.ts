import { AlertService } from './../services/alert.service';
import { ArticleService } from './../services/article.service';

import { categories } from './../configs/data-config';
import { UploadService } from './../services/upload.service';
import { LocationService } from './../services/location.service';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { placeholderImage } from './../configs/data-config';
import { SelectionService } from './../services/selection.service';
import { AuthServiceMail } from './../services/auth.service';
import { Seller } from './../types/user.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subcategory, Category } from '../types/category.model';
import { subcategories, conditionList, priceStatusList, shippingList } from '../configs/data-config';
import { ArticlesImages, PriceStatus, Shipping, LocationData, Article } from '../types/article.model';
import * as uuid from 'uuid';
import {MatDialog} from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { DialogMapComponent } from '../dialog-map/dialog-map.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit, OnDestroy {

  seller: Seller;

  selectedCategory: Category;
  selectedSubcategory: Subcategory;
  subcategories: Subcategory[] = [];
  jounreySelected: boolean;

  conditionList: string[] = conditionList;
  priceStatusList: PriceStatus[] = priceStatusList;
  shippingList: Shipping[] = shippingList;

  placeholderImage: string = placeholderImage;
  placeholderDescription: string;

  errorPictureMessage: string;
  currentIndex: number;
  articleImages: ArticlesImages[] = [];
  deletedArticleImages: string[] = [];

  newArticle: FormGroup;
  locations: FormArray;

  loadingUpload: boolean;


  constructor(
    private alertService: AlertService,
    private authServiceMail: AuthServiceMail,
    private selectionService: SelectionService,
    private articleService: ArticleService,
    public dialog: MatDialog,
    private locationService: LocationService,
    private uploadService: UploadService,
    private router: Router) { }

  ngOnInit() {
    this.seller = this.authServiceMail.seller;

    this.initForm();
    this.initPictures();
    if (this.selectionService.currentArticle) {
      this.updateForm(this.selectionService.currentArticle);
    }
  }

  ngOnDestroy() {
    this.selectionService.currentArticle = null;
  }

  initForm() {
    this.selectedCategory = this.seller.categoryInfo;
    if (this.selectedCategory) {
      this.subcategories = subcategories.filter(sub => sub.category === this.selectedCategory.id);
    }
    this.selectedSubcategory = null;

    this.newArticle = new FormGroup({
      id: new FormControl(''),
      inactive: new FormControl(false, Validators.required),
      validTo: new FormControl(new Date(new Date().setMonth(new Date().getMonth() + 3)), Validators.required),
      extended: new FormControl(0, Validators.required),
      userId: new FormControl(this.seller.userId, Validators.required),
      category: new FormControl(this.seller.category, Validators.required),
      subcategory: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      condition: new FormControl(this.conditionList[0], Validators.required),
      price: new FormControl('',  Validators.pattern('^[0-9]*$')),
      priceStatus: new FormControl(this.priceStatusList[0].long, Validators.required),
      locations: new FormArray([
        new FormControl(this.seller.location, [Validators.required])
      ]),
      mapLocation: new FormControl(true),
      views: new FormControl(0),
      shipping: new FormControl(this.shippingList[0].label, Validators.required),
      sellerEmail: new FormControl(this.seller.email, [Validators.required, Validators.email]),
      sellerPhone: new FormControl(this.seller.phone)
    });
  }

  initPictures() {
    this.articleImages = [
      {id: 1, label: 'Titelbild*', imgUrl: null, imgFile: null},
      {id: 2, label: 'Bild 2', imgUrl: null, imgFile: null},
      {id: 3, label: 'Bild 3', imgUrl: null, imgFile: null},
      {id: 4, label: 'Bild 4', imgUrl: null, imgFile: null},
      {id: 5, label: 'Bild 5', imgUrl: null, imgFile: null},
      {id: 6, label: 'Bild 6', imgUrl: null, imgFile: null},
    ];
  }

  updateForm(article: Article) {

    this.selectedCategory = categories.find(category => category.id === article.category);
    if (this.selectedCategory) {
      this.subcategories = subcategories.filter(sub => sub.category === this.selectedCategory.id);
    }
    this.selectedSubcategory = subcategories.find(subcat => subcat.id === article.subcategory);

    this.newArticle.patchValue({
      id: article.id,
      userId: article.userId,
      category: article.category,
      subcategory: article.subcategory,
      title: article.title,
      description: article.description,
      condition: article.condition,
      price: article.price,
      priceStatus: article.priceStatus,
      locations: article.locations,
      mapLocation: article.mapLocation,
      views: article.views,
      shipping: article.shipping,
      sellerEmail: article.sellerEmail,
      sellerPhone: article.sellerPhone
    });

    article.pictureUrls.forEach((imageUrl, index) => {
      this.articleImages[index].imgUrl = imageUrl;
    });
  }

  categoryChange(category: Category) {
    this.jounreySelected = false;
    if (category) {
      if (category.id === 'journeys') {
        this.placeholderDescription = 'Schreibe hier Detail zu deiner Reise: Art der Unterkuft, Anzahl der Leute, Von wo fahrt ihr los....';
        this.jounreySelected = true;
      } else {
        this.placeholderDescription = 'Schreibe hier Einzelheiten zu deinem Artikel';
      }
      this.newArticle.controls.category.setValue(category.id);
      this.subcategories = subcategories.filter(sub => sub.category === category.id);
    } else {
      this.subcategories = [];
    }
    this.selectedCategory = category;
    this.selectedSubcategory = null;
  }

  selectedSubcategoryChange(subcategory: Subcategory) {
    this.selectedSubcategory = subcategory;
    if (subcategory) {
      this.newArticle.controls.subcategory.setValue(subcategory.id);
    }
  }

  getLocation() {
    this.locationService.getLocationByIp((location: LocationData) => {
      this.newArticle.get('locations')['controls'][0].setValue(location.name);
    });
  }

  onAddLocation() {
    this.locations = this.newArticle.get('locations') as FormArray;
    this.locations.push(new FormControl(''));
  }

  onDeleteLocation(index: number) {
    this.locations.removeAt(index);
  }

  showMap() {
    const dialogRef = this.dialog.open(DialogMapComponent, {
      width: '400px',
      height: '510px',
      data: {locations: this.newArticle.value.locations}
    });
  }

  saveIndex(index: number) {
    this.currentIndex = index;
  }

  handleFileInput(files: File[], index: number) {
    this.errorPictureMessage = null;
    // this.uploadService.uploadImage(file);
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        this.alertService.openAlert('Wähle ein Bild aus', 'warning');
        return;
      }

    this.readFileWithIndex(files[0], this.currentIndex);

    // const emptyIndex = [];
    // this.articleImages.forEach((el, index) => {
    //   if (!el.imgUrl) {
    //     emptyIndex.push(index);
    //   }
    // });

    // console.log(emptyIndex);

    // if (emptyIndex.indexOf(this.currentIndex) === -1) { // Fall das kommendes Bild das bisherige an der Position ersetzt
    //   this.readFileWithIndex(files[0], this.currentIndex);
    // } else {
    //   this.readFileWithIndex(files[0], emptyIndex[0]);
    // }
  }

  readFileWithIndex(file: File, index: number) {
    console.log(file);

    if (file.size > 2000000) {
      this.alertService.openAlert('Die Bilddatei ist zu groß', 'warning');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.articleImages[index].imgUrl = reader.result;
      };
    this.articleImages[index].imgFile = file;
  }

  onDeleteImage(index: number) {
    const articleImage = this.articleImages.find(image => image.id === (index + 1));
    if (articleImage.imgFile) {
      articleImage.imgFile = null;
      articleImage.imgUrl = null;
    } else {
      this.deletedArticleImages.push(articleImage.imgUrl);
      articleImage.imgUrl = null;
    }
  }

  uploadArticle(articleId: string) {
    const newImages: ArticlesImages[] = this.articleImages.filter(image => image.imgFile != null);
    const currentImages: ArticlesImages[] = this.articleImages.filter(image => image.imgFile == null && image.imgUrl != null);
    const uploadedImages = [];
    let imageCount = 0;

    currentImages.forEach(image => {
      const newImage = {order: image.id, url: image.imgUrl};
      uploadedImages.push(newImage);
    });

    if (newImages.length === 0) {
      this.newArticle.value.pictures = uploadedImages;
      this.httpCallUpsertArtcile(this.newArticle.value);
    } else {
      newImages.forEach(image => {
        this.uploadService.uploadImage(image.imgFile, null, articleId, image.id).subscribe(imageUrl => {
          imageCount++;
          const newImage = {order: image.id, url: imageUrl};
          uploadedImages.push(newImage);
          if (imageCount === newImages.length) {
            this.newArticle.value.pictures = uploadedImages;
            this.httpCallUpsertArtcile(this.newArticle.value);
          }
        });
      });
    }
  }

  httpCallUpsertArtcile(article: Article) {
    this.articleService.upsertArticle(article).subscribe(result => {
      this.loadingUpload = false;
      if (result !== 'error') {
        this.alertService.openAlert('Anzeige erfolgreich erstellt', 'success');
        this.router.navigate(['article/' + article.id]);
      }
    });
  }

  saveArticle() {
    this.loadingUpload = true;
    if (this.newArticle.value.id) {
      this.updateArticle();
    } else {
      this.insertArticle();
    }
  }

  insertArticle() {
    const articleId: string = uuid.v4();
    this.newArticle.value.id = articleId;
    this.uploadArticle(articleId);
  }

  updateArticle() {
      this.deletedArticleImages.forEach(imageUrl => {
        this.uploadService.deleteImage(imageUrl);
      });
      this.uploadArticle(this.newArticle.value.id);
  }

  resetArticle(): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      height: '200px',
      data: {text: 'Hiermit wird dieser Artikel zurückgesetzt.', action: 'Reset'}
    });

    dialogRef.afterClosed().subscribe(resetCall => {
      if (resetCall) {
        this.initForm();
        this.initPictures();
      }
    });
  }
}
