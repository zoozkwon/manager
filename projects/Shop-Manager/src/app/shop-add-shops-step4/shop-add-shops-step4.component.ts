import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-shop-add-shops-step4',
  templateUrl: './shop-add-shops-step4.component.html',
  styleUrls: ['./shop-add-shops-step4.component.css']
})
export class ShopAddShopsStep4Component implements OnInit {
  shop_info: any; banner: any; logo: any; adress: any;
  constructor( private APIService: ApiService ) { }

  ngOnInit() {
    if (localStorage.getItem('shop_product') === null) {
      swal("에러","상품 정보가 없습니다 다시 시도해주세요", "error");
      window.location.href = 'manager/ShopAddListing';
    } else if ( localStorage.getItem('shop_info') === null) {
      swal("에러","샵정보가 없습니다 다시 시도해주세요", "error");
      window.location.href = 'manager/ShopAddListing';
    } else if ( localStorage.getItem('adress') === null) {
      swal("에러","위치 정보가 없습니다 다시 시도해주세요", "error");
      window.location.href = 'manager/ShopAddListing';
    }

    this.createShop();
  }

  createShop() {
    this.shop_info = JSON.parse(localStorage.getItem('shop_info'));
    this.adress = JSON.parse(localStorage.getItem('adress'));
    if ( localStorage.getItem('banner') !== null ) {
      this.banner = localStorage.getItem('banner');
    } else {
      this.banner = '';
    }

    if ( localStorage.getItem('logo') !== null ) {
      this.logo = localStorage.getItem('logo');
    } else {
      this.logo = '';
    }
    const product = JSON.parse(localStorage.getItem('shop_product'));
    const user = JSON.parse(localStorage.getItem('manager_users'));
    const data = {
      act : 'shops.procCreateShop',
      user_no : user.no,
      user_id : user.id,
      user_name : user.name,
      email : user.email,
      shop_name : this.shop_info.shop_name,
      category : this.shop_info.category,
      sub_title : this.shop_info.sub_title,
      shop_content : this.shop_info.shop_content,
      si : this.adress.si,
      gu : this.adress.gu,
      adress : this.adress.adress,
      kakao : this.adress.kakao,
      blog : this.adress.blog,
      banner : this.banner,
      logo : this.logo,
      product_no : product.no
    };
    console.log(data);
    this.APIService.sendApi(data).then( res => {
      if (res.error !== -1) {
        swal("","샵 개설이 완료 되었습니다 승인 대기중입니다.", "success");
      }
    });
  }

}
