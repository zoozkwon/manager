import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { ImagesService } from '../_services/images.service';
import { ApiService } from '../_services/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {
  items = []; category: any; categorys = []; now_category: any; new_category: any;
  categoryUrl = 'http://ec2-15-164-60-92.ap-northeast-2.compute.amazonaws.com/uploadImage/category/';
  file_name: any;
  public image: string;
  public isSelected: boolean = false;
  private _SUFFIX: string;
  @ViewChild('name') name: ElementRef;
  @ViewChild('new_name') new_name: ElementRef;

  constructor(  private _IMAGES: ImagesService ,
                private APIService: ApiService ,
                private location: Location ) { }

  ngOnInit() {
    this.Directory();
  }

  Directory() {
    const data = {act: 'masters.procCategory'};
    this.APIService.sendApi(data).then( res => {
      const category = res.variables.data;
      this.categorys = [];
      for (let i = 0; i < category.length ; i++) {
        category[i].images = this.categoryUrl + category[i].images;
        if (category[i].active === 'Y' ) {
          category[i].color = 'btn-primary';
          category[i].actives = '활성화';
        } else {
          category[i].color = 'btn-danger';
          category[i].actives = '비활성화';
        }
        this.categorys.push(
            category[i]
        );
      }
      console.log(this.categorys);
    });
  }

  GetCategoryData(category) {
    const data = {act: 'masters.procGetDirectoryData' , category_no : category.no};
    this.APIService.sendApi(data).then( res => {
      const category = res.variables.data;
      category.images = this.categoryUrl + category.images;
      this.items = [];
      this.items.push(
          category
      );
      console.log(this.items);
    });
  }

  change_active(category) {
    const data = {
      act: 'masters.procCategorysActive',
      category_no : category.no,
      active : category.active
    };
    this.APIService.sendApi(data).then( res => {
      if (res.error !== -1) {
        this.Directory();
      }
    });
  }

  selectFileToUpload(event): void {
    const file: any 		= event.target.files[0];
    const data = ({file : file, code : 1 });
    this._IMAGES
        .handleImageSelection(data)
        .subscribe((res) => {
              // Retrieve the file type from the base64 data URI string
              this._SUFFIX 			= res.split(':')[1].split('/')[1].split( ";" )[0];
              // Do we have correct file type?
              if (this._IMAGES.isCorrectFileType(this._SUFFIX)) {
                // Hide the file input field, display the image in the component template
                // and display an upload button
                this.isSelected 	= true;
                this.image          = res;
                if ( event.target.id === 'shop_category' ) this.now_category = res;
                else if ( event.target.id === 'new_shop_category' ) this.new_category = res;
              }
            },
            (error) => {
              console.dir(error);
            });
  }

  imageUpdate(category) {
    if ( this.name.nativeElement.value === '') {
      swal('카테고리명을 입력해주세요');
    } else {
      if (this.now_category !== undefined) {
        this._IMAGES.uploadImageSelection(this.now_category, this._SUFFIX).subscribe((res) => {
          this.file_name = res.filename;
          const data = {
            act: 'masters.procCategoryUpdate',
            imagename: this.file_name,
            category_no: category.no,
            name: this.name.nativeElement.value
          };
          this.APIService.sendApi(data).then(res1 => {
            if (res1.error !== -1) {
              this.image = '';
              swal('변경사항을 업데이트 했습니다.').then((value) => {
                window.location.reload();
              });
            }
          });
        });
      } else {
        const data = {
          act: 'masters.procCategoryUpdate',
          category_no: category.no,
          name: this.name.nativeElement.value
        };
        this.APIService.sendApi(data).then(res1 => {
          if (res1.error !== -1) {
            this.image = '';
            swal('변경사항을 업데이트 했습니다.').then((value) => {
              window.location.reload();
            });
          }
        });
      }
    }
  }

  new_imageUpdate() {
    if ( this.new_name.nativeElement.value === '') {
      swal('카테고리명을 입력해주세요');
    } else {
      if (this.new_category !== undefined) {
        this._IMAGES.uploadImageSelection(this.new_category, this._SUFFIX).subscribe((res) => {
          this.file_name = res.filename;
          const data = {
            act: 'masters.procCategoryCreate',
            imagename : this.file_name,
            name : this.new_name.nativeElement.value
          };
          this.APIService.sendApi(data).then( res1 => {
            if (res1.error !== -1) {
              this.image = '';
              swal('카테고리를 생성 했습니다').then((value) => {
                window.location.reload();
              });
            }
          });
        });
      } else {
        const data = {
          act: 'masters.procCategoryCreate',
          name : this.new_name.nativeElement.value
        };
        this.APIService.sendApi(data).then( res1 => {
          if (res1.error !== -1) {
            this.image = '';
            swal('카테고리를 생성 했습니다.').then((value) => {
              window.location.reload();
            });
          }
        });
      }
    }
  }

}
