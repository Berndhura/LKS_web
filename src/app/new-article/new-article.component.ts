import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { placeholderImage } from './../configs/config';
import { SelectionService } from './../services/selection.service';
import { AuthServiceMail } from './../services/auth.service';
import { Seller } from './../types/user.model';
import { Component, OnInit } from '@angular/core';
import { Subcategory, Category } from '../types/category.model';
import { subcategories, zustandList } from '../configs/data-config';
import { ArticlesImages } from '../types/article.model';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {

  seller: Seller;

  selectedCategory: Category;
  selectedSubcategory: Subcategory;
  subcategories: Subcategory[] = [];

  zustandList: string[] = zustandList;

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

  newArticle = new FormGroup({
    category: new FormControl(''),
    subcategory: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    condition: new FormControl(''),
    price: new FormControl(''),
    priceStatus: new FormControl(''),
    locations: new FormArray([]),
    shipping: new FormControl(''),
    pictures: new FormArray([]),
    mail: new FormControl(''),
    phone: new FormControl(''),
  });

  constructor(private authServiceMail: AuthServiceMail, private selectionService: SelectionService) { }

  ngOnInit() {
    this.seller = this.authServiceMail.seller;
    this.selectedCategory = this.seller.category;
    this.selectedSubcategory = this.selectionService.selectedSubcategory;
    if (this.selectedCategory) {
      this.subcategories = subcategories.filter(sub => sub.category === this.selectedCategory.id);
    }
  }

  categoryChange(category: Category) {
    this.newArticle.controls.category.setValue(category.id);
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

  saveArticle() {
    console.log(this.newArticle.value);
  }

}
