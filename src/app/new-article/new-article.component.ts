
import { categories } from './../configs/data-config';
import { UploadService } from './../services/upload.service';
import { LocationService } from './../services/location.service';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { placeholderImage } from './../configs/data-config';
import {firebaseImageUrl} from './../configs/config';
import { SelectionService } from './../services/selection.service';
import { AuthServiceMail } from './../services/auth.service';
import { Seller } from './../types/user.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subcategory, Category } from '../types/category.model';
import { subcategories, conditionList, priceStatusList, shippingList } from '../configs/data-config';
import { ArticlesImages, PriceStatus, Shipping, LocationData, Article } from '../types/article.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as uuid from 'uuid';
import {MatDialog} from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

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

  conditionList: string[] = conditionList;
  priceStatusList: PriceStatus[] = priceStatusList;
  shippingList: Shipping[] = shippingList;

  firebaseImageUrl: string = firebaseImageUrl;
  placeholderImage: string = placeholderImage;
  errorPictureMessage: string;
  currentIndex: number;
  articleImages: ArticlesImages[] = [
                      {id: 0, label: 'Titelbild*', imgUrl: null, imgFile: null},
                      {id: 1, label: 'Bild 2', imgUrl: null, imgFile: null},
                      {id: 2, label: 'Bild 3', imgUrl: null, imgFile: null},
                      {id: 3, label: 'Bild 4', imgUrl: null, imgFile: null},
                      {id: 4, label: 'Bild 5', imgUrl: null, imgFile: null},
                      {id: 5, label: 'Bild 6', imgUrl: null, imgFile: null},
                    ];


  newArticle: FormGroup;
  locations: FormArray;


  constructor(
    private authServiceMail: AuthServiceMail,
    private selectionService: SelectionService,
    public dialog: MatDialog,
    private locationService: LocationService,
    private uploadService: UploadService) { }

  ngOnInit() {
    this.seller = this.authServiceMail.seller;

    this.initForm();
    if (this.selectionService.currentArticle) {
      this.updateForm(this.selectionService.currentArticle);
    }
  }

  ngOnDestroy() {
    this.selectionService.currentArticle = null;
  }

  initForm() {
    this.selectedCategory = this.seller.category;
    if (this.selectedCategory) {
      this.subcategories = subcategories.filter(sub => sub.category === this.selectedCategory.id);
    }
    this.selectedSubcategory = null;

    this.newArticle = new FormGroup({
      category: new FormControl(this.seller.categoryId, Validators.required),
      subcategory: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      condition: new FormControl(this.conditionList[0], Validators.required),
      price: new FormControl('',  Validators.pattern('^[0-9]*$')),
      priceStatus: new FormControl(this.priceStatusList[0].long, Validators.required),
      locations: new FormArray([
        new FormControl(this.seller.location, [Validators.required])
      ]),
      shipping: new FormControl(this.shippingList[0].label, Validators.required),
      mail: new FormControl(this.seller.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.seller.phone),
    });
  }

  updateForm(article: Article) {

    this.selectedCategory = categories.find(category => category.id === article.category);
    if (this.selectedCategory) {
      this.subcategories = subcategories.filter(sub => sub.category === this.selectedCategory.id);
    }
    this.selectedSubcategory = subcategories.find(subcat => subcat.id === article.subcategory);

    this.newArticle.patchValue({
      category: article.category,
      subcategory: article.subcategory,
      title: article.title,
      description: article.description,
      condition: article.zustand,
      price: article.price,
      priceStatus: article.priceStatus,
      shipping: article.shipping,
      mail: article.sellerMail,
      phone: article.sellerPhone,
    });
  }

  categoryChange(category: Category) {
    this.newArticle.controls.category.setValue(category.id);
    this.selectedCategory = category;
    this.selectedSubcategory = null;
    this.subcategories = subcategories.filter(sub => sub.category === category.id);
  }

  selectedSubcategoryChange(subcategory: Subcategory) {
    this.selectedSubcategory = subcategory;
    this.newArticle.controls.subcategory.setValue(subcategory.id);
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

  saveIndex(index: number) {
    this.currentIndex = index;
  }

  handleFileInput(files: File[]) {
    this.errorPictureMessage = null;
    // this.uploadService.uploadImage(file);
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        this.errorPictureMessage = 'Bitte wähle ein Bild aus';
        return;
      }

    const emptyIndex = [];
    this.articleImages.forEach((el, index) => {
      if (!el.imgUrl) {
        emptyIndex.push(index);
      }
    });

    if (emptyIndex.indexOf(this.currentIndex) === -1) { // Fall das kommendes Bild das bisherige an der Position ersetzt
      this.readFileWithIndex(files[0], this.currentIndex);
    } else {
      this.readFileWithIndex(files[0], emptyIndex[0]);
    }
  }

  readFileWithIndex(file: File, index: number) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.articleImages[index].imgUrl = reader.result;
      };
    this.articleImages[index].imgFile = file;
  }

  onDeleteImage(index: number) {
    const articleImage = this.articleImages.find(image => image.id === index);
    articleImage.imgFile = null;
    articleImage.imgUrl = null;
  }

  saveArticle() {
    const articleId: string = uuid.v4();
    const images: ArticlesImages[] = [];
    const uploadedImages = [];
    let imageCount = 0;
    this.articleImages.find(image => {
      if (image.imgFile != null) {
        images.push(image);
      }
    });
    images.forEach(image => {
      this.uploadService.uploadImage(image.imgFile, null, articleId, image.id).subscribe(imageUrl => {
        imageCount++;
        const newImage = {id: image.id, url: imageUrl};
        uploadedImages.push(newImage);
        if (imageCount === images.length) {
          this.newArticle.value.pictures = uploadedImages;
          console.log(this.newArticle.value);
        }
      });
    });
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
      }
    });
  }

}
