import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { ImagesService } from '../_services/images.service';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-shop-manage-data',
  templateUrl: './shop-manage-data.component.html',
  styleUrls: ['./shop-manage-data.component.css']
})
export class ShopManageDataComponent implements OnInit {
  n: any; shop_no: number; shops = []; Dos = []; Gus = []; banner: any; logo: any;
  file_name: any; ends: any; si: any;
  type: any; shop_contents: any; times = []; optimes = []; items = [];
  public image: string;
  public isSelected: boolean = false;
  private _SUFFIX: string;
  selecetdFile: File;

  @ViewChild('shop_content') shop_content: ElementRef;
  @ViewChild('sub_title') sub_title: ElementRef;
  @ViewChild('sis') sis: ElementRef;
  @ViewChild('kakao') kakao: ElementRef;
  @ViewChild('blog') blog: ElementRef;
  @ViewChild('adress') adress: ElementRef;
  @ViewChild('Shop_Si') Shop_Si: ElementRef;
  @ViewChild('start_time') start_time: ElementRef;
  @ViewChild('end_time') end_time: ElementRef;
  @ViewChild('OFF') OFF: ElementRef;

  logoUrl: any;
  bannerUrl: any;

  constructor( private _IMAGES: ImagesService,
               private route: ActivatedRoute,
               private APIService: ApiService ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.n = params['no'];
    });
    const data = (
        'logo'
    );
    this.APIService.getUrl(data).then( res => {
      this.logoUrl = res ;
    });
    const data1 = (
        'banner'
    );
    this.APIService.getUrl(data1).then( res => {
      this.bannerUrl = res ;
    });
    this.shop_no = +this.n;
    this.times = [];
    if (this.times) {
      this.times.push(
          {time : '1.00 am'},
          {time : '2.00 am'},
          {time : '3.00 am'},
          {time : '4.00 am'},
          {time : '5.00 am'},
          {time : '6.00 am'},
          {time : '7.00 am'},
          {time : '8.00 am'},
          {time : '9.00 am'},
          {time : '10.00 am'},
          {time : '11.00 am'},
          {time : '12.00 am'},
          {time : '1.00 pm'},
          {time : '2.00 pm'},
          {time : '3.00 pm'},
          {time : '4.00 pm'},
          {time : '5.00 pm'},
          {time : '6.00 pm'},
          {time : '7.00 pm'},
          {time : '8.00 pm'},
          {time : '9.00 pm'},
          {time : '10.00 pm'},
          {time : '11.00 pm'},
          {time : '12.00 pm'},
      );
    }
    this.GetShop();
    this.Category();
    this.get_citys();
    this.GetOpTime();
  }

  GetShop() {
    const data = {
      act : 'datas.procGetShop',
      shop_no : this.shop_no,
      type : 'manager'
    };
    this.APIService.sendApi(data).then( res => {
      if ( res.error !== -1) {
        this.shops = [];
        res.variables.data.logo = this.logoUrl + res.variables.data.logo;
        res.variables.data.banner = this.bannerUrl + res.variables.data.banner;

        if ( res.variables.endActive !== undefined){
          this.ends = '해당 샵은 이용기간이 만료되었습니다.';
        }
        this.shop_contents = res.variables.data.shop_content;
        this.shops.push(
            res.variables.data
        );
        this.si = this.shops[0].si;
        this.get_gus();
      }
    });
  }

  /*카테고리 조회*/
  Category() {
    const data = {act: 'datas.procDirectory'};
    this.APIService.sendApi(data).then( data => {
      const Directorys = data.variables.data;
      if (this.items['id'] !== '') {
        this.items = [];
      }
      for (let i = 0; i < Directorys.length ; i++) {
        this.items.push({
          no : Directorys[i].no ,
          name: Directorys[i].name
        });
      }
    });
  }

  GetOpTime() {
    const user = JSON.parse(localStorage.getItem('manager_users'));
    const data = {
      act: 'shops.procShopOpTimes',
      user_no : user.no,
      shop_no : this.shop_no
    };
    this.APIService.sendApi(data).then( res => {
      if (res.error !== -1) {
        for (let i = 0; i < res.variables.count; i++ ) {
          this.optimes.push(
              res.variables.data[i]
          );
        }
      }
    });
  }

  get_citys() {
    const data = {act: 'datas.procGet_Si'};
    this.APIService.sendApi(data).then( res => {
      const city = res.variables;
      for (let i = 0; i < city.count ; i++) {
        this.Dos.push(
            city.data[i]
        );
      }
    });
  }

  get_gus() {
    const data = {act: 'datas.procGet_Gu' , si : this.si};
    this.APIService.sendApi(data).then( res => {
      const gu = res.variables;
      this.Gus = [];
      for (let i = 0; i < gu.count ; i++) {
        this.Gus.push(
            gu.data[i]
        );
      }
    });
  }

  SelectSi() {
    this.si = this.Shop_Si.nativeElement.value;
    const data = {act: 'datas.procGet_Gu' , si : this.si};
    this.APIService.sendApi(data).then( res => {
      const gu = res.variables;
      this.Gus = [];
      for (let i = 0; i < gu.count; i++) {
        this.Gus.push(
            gu.data[i]
        );
      }
    });
  }

  starttime(time) {
    time.start_time = this.start_time.nativeElement.value;
  }
  endtime(time) {
    time.end_time = this.end_time.nativeElement.value;
  }
  off(time) {
    time.off = this.OFF.nativeElement.value;
  }
  /*샵 오픈 시간 업데이트*/
  timeUp(time) {
    const data = {
      act : 'shops.procShopOpTimeUpdate',
      no : time.no,
      start_time : time.start_time,
      end_time : time.end_time,
      off : time.off
    };
    console.log(data);
    this.APIService.sendApi(data).then( res => {
      if (res.error !== -1) {
        alert('변경사항이 저장되었습니다.');
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
                if ( event.target.id === 'shop_banner' ) this.banner = res;
                else if ( event.target.id === 'shop_logo' ) this.logo = res;
              }
            },
            (error) => {
              console.dir(error);
            });
  }

  imageUpdate(event) {
    if (this.image !== undefined) {
      this._IMAGES.uploadImageSelection(this.image, this._SUFFIX).subscribe((res) => {
        this.file_name = res.filename;
        const data = {
          act: 'shops.procShopImageUpdate',
          target : event.target.id,
          imagename : this.file_name,
          shop_no : this.shop_no
        };
        this.APIService.sendApi(data).then( res1 => {
          if (res1.error !== -1) {
            alert('업로드가 완료 되었습니다.');
            window.location.reload();
          }
        });
      });
    }
  }

  blogsUpdate () {
    const data = {
      act : 'shops.procBlogsUpdate',
      blog : this.blog.nativeElement.value,
      kakao : this.kakao.nativeElement.value,
      shop_no : this.shop_no
    };
    this.APIService.sendApi(data).then( res => {
      if (res.error !== -1) {
        alert('변경사항을 저장 했습니다.');
      }
    });
  }
}
