import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-shop-extension',
  templateUrl: './shop-extension.component.html',
  styleUrls: ['./shop-extension.component.css']
})
export class ShopExtensionComponent implements OnInit {
  items = []; tt: string;
  logoUrl = 'http://ec2-15-164-60-92.ap-northeast-2.compute.amazonaws.com/uploadImage/shop_logo/';
  constructor( private APIService: ApiService , private router: Router ) { }

  ngOnInit() {
    localStorage.removeItem('shop_info');
    localStorage.removeItem('logo');
    localStorage.removeItem('banner');
    localStorage.removeItem('adress');
    localStorage.removeItem('shop_product');
    localStorage.removeItem('ex_shop_product');
    this.Shops();
    this.tt = '5';
  }

  Shops() {
    const users = JSON.parse(localStorage.getItem( 'manager_users' ));
    const data = {act : 'datas.procManagerGetProducts', id : users.id };
    this.APIService.sendApi(data).then( res => {
      if (res.error === 0) {
        const Shops = res.variables.data;
        for ( let i = 0; i < res.variables.count; i++) {
          Shops[i].logo = this.logoUrl + Shops[i].logo;
          this.items.push(
              Shops[i]
          );
        }
      }
    });
  }

  moveThereceives(shop) {
    if (shop.receives === 'Y') {
      swal( '승인 대기중입니다.' );
    } else if (shop.receives === 'N') {
      window.location.href = 'manager/ShopExt/step1?no=' + shop.no;
    }
  }
}
