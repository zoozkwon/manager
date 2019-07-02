import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { ImagesService } from '../_services/images.service';
import { ApiService } from '../_services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css']
})
export class EventManagementComponent implements OnInit {
  banners = []; get_banners = []; now_banner: any; new_banner: any;
  bannerurl = "http://ec2-15-164-60-92.ap-northeast-2.compute.amazonaws.com/uploadImage/banner/";
  file_name: any;
  public image: string;
  public isSelected: boolean = false;
  private _SUFFIX: string;

  @ViewChild('new_banner_write') new_banner_write: ElementRef;
  @ViewChild('new_banner_purpose') new_banner_purpose: ElementRef;
  @ViewChild('banner_write') banner_write: ElementRef;
  @ViewChild('banner_purpose') banner_purpose: ElementRef;

  constructor(  private _IMAGES: ImagesService ,
                private APIService: ApiService ,
                private route: ActivatedRoute , private router: Router ) { }

  ngOnInit() {
    this.getbanners();
  }

  getbanners() {
    const data = {act: 'masters.procGetBanners'};
    this.APIService.sendApi(data).then( res => {

      const banner = res.variables.banners;

      this.banners = [];

      for (let i = 0; i < res.variables.count; i++) {
        banner[i].image = this.bannerurl + banner[i].imageName;
        if (banner[i].active === 'Y' ) {
          banner[i].color = 'btn-primary';
          banner[i].actives = '활성화';
        } else {
          banner[i].color = 'btn-danger';
          banner[i].actives = '비활성화';
        }
        this.banners.push(
            banner[i]
        );
      }
    });
  }

  change_active(banner) {
    const data = {
      act: 'masters.procBannersActive',
      banner_no : banner.no,
      active : banner.active
    };
    this.APIService.sendApi(data).then( res => {
      if (res.error !== -1) {
        this.getbanners();
      }
    });
  }

  GetBannerData(banner) {
    const data = {
      act : 'masters.procGetBannerData',
      banner_no : banner.no
    };
    this.APIService.sendApi(data).then( res => {
      res.variables.banners.image = this.bannerurl + res.variables.banners.imageName;
      if (res.error !== -1) {
        this.get_banners = [];
        this.get_banners.push(
            res.variables.banners
        );
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
                if ( event.target.id === 'shop_banner' ) this.now_banner = res;
                else if ( event.target.id === 'new_shop_banner' ) this.new_banner = res;
              }
            },
            (error) => {
              console.dir(error);
            });
  }

  imageUpdate(banner) {
    if (this.now_banner !== undefined) {
      this._IMAGES.uploadImageSelection(this.now_banner, this._SUFFIX).subscribe((res) => {
        this.file_name = res.filename;
        const user = JSON.parse(localStorage.getItem('master_users'));
        const data = {
          act: 'masters.procBannerUpdate',
          imagename : this.file_name,
          banner_no: banner.no,
          user_id : user.id,
          banner_write : this.banner_write.nativeElement.value,
          banner_purpose : this.banner_purpose.nativeElement.value
        };
        this.APIService.sendApi(data).then( res1 => {
          if (res1.error !== -1) {
            this.image = '';
            console.log('tt');
            swal('변경사항을 업데이트 했습니다.').then((value) => {
              window.location.reload();
            });
          }
        });
      });
    } else {
      const user = JSON.parse(localStorage.getItem('master_users'));
      const data = {
        act: 'masters.procBannerUpdate',
        banner_no: banner.no,
        user_id : user.id,
        banner_write : this.banner_write.nativeElement.value,
        banner_purpose : this.banner_purpose.nativeElement.value
      };
      this.APIService.sendApi(data).then( res1 => {
        if (res1.error !== -1) {
          this.image = '';
          swal('변경사항을 업데이트 했습니다.').then((value) => {
            window.location.reload();
          });
        }
      });
    }
  }

  new_imageUpdate() {
    if (this.new_banner !== undefined) {
      this._IMAGES.uploadImageSelection(this.new_banner, this._SUFFIX).subscribe((res) => {
        this.file_name = res.filename;
        const user = JSON.parse(localStorage.getItem('master_users'));
        const data = {
          act: 'masters.procBannerCreate',
          imagename : this.file_name,
          user_id : user.id,
          banner_write : this.new_banner_write.nativeElement.value,
          banner_purpose : this.new_banner_purpose.nativeElement.value
        };
        this.APIService.sendApi(data).then( res1 => {
          if (res1.error !== -1) {
            this.image = '';
            swal('배너가 생성 되었습니다.').then((value) => {
              window.location.reload();
            });
          }
        });
      });
    } else {
      const user = JSON.parse(localStorage.getItem('master_users'));
      const data = {
        act: 'masters.procBannerCreate',
        imagename : this.file_name,
        user_id : user.id,
        banner_write : this.new_banner_write.nativeElement.value,
        banner_purpose : this.new_banner_purpose.nativeElement.value
      };
      this.APIService.sendApi(data).then( res1 => {
        if (res1.error !== -1) {
          this.image = '';
          swal('배너가 생성 되었습니다.').then((value) => {
            window.location.reload();
          });
        }
      });
    }
  }

  delete(banner) {
    swal({
      text: "정말 삭제하시겠습니까?",
      icon: "error",
      buttons: ["취소", "삭제"],
    }).then( value => {
      if (value === true) {
        const data = {
          act : 'masters.procBannerDelete',
          banner_no : banner.no
        };
        this.APIService.sendApi(data).then( res => {
          if ( res.error !== -1) {
            swal('배너가 삭제 되었습니다.').then((value) => {
              window.location.reload();
            });
          }
        });
      }
    });
  }

}
