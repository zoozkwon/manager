import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../_services/images.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-shop-add-shops-step2',
  templateUrl: './shop-add-shops-step2.component.html',
  styleUrls: ['./shop-add-shops-step2.component.css']
})
export class ShopAddShopsStep2Component implements OnInit {
  banner: any; logo: any; file_name: any; banner_SUFFIX: any; logo_SUFFIX: any;
  public image: string;
  public isSelected: boolean = false;
  private _SUFFIX: string;

  constructor( private _IMAGES: ImagesService ) { }

  ngOnInit() {
    localStorage.removeItem('logo');
    localStorage.removeItem('banner');
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
                if ( event.target.id === 'shop_banner' ) {
                  this.banner = res;
                  this.banner_SUFFIX = this._SUFFIX;
                }
                else if ( event.target.id === 'shop_logo' ) {
                  this.logo = res;
                  this.logo_SUFFIX = this._SUFFIX;
                }
              }
            },
            (error) => {
              console.dir(error);
            });
  }

  logoUpdate() {
    if (this.logo !== undefined) {
      this._IMAGES.uploadImageSelection(this.logo, this.logo_SUFFIX).subscribe((res) => {
        this.file_name = res.filename;
        localStorage.setItem('logo', this.file_name);
      });
    }
  }

  bannerUpdate() {
    if (this.banner !== undefined) {
      this._IMAGES.uploadImageSelection(this.banner, this.banner_SUFFIX).subscribe((res) => {
        this.file_name = res.filename;
        localStorage.setItem('banner', this.file_name);
      });
    }
  }
}
