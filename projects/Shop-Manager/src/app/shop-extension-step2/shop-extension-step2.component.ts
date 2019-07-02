import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-shop-extension-step2',
  templateUrl: './shop-extension-step2.component.html',
  styleUrls: ['./shop-extension-step2.component.css']
})
export class ShopExtensionStep2Component implements OnInit {
  n: any; shop_no: number;
  constructor( private route: ActivatedRoute,
               private APIService: ApiService ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.n = params['no'];
      this.shop_no = +this.n;
    });
    console.log(JSON.parse(localStorage.getItem('ex_shop_product')));
    this.create_ext();
  }

  create_ext() {
    const get_data = JSON.parse(localStorage.getItem('ex_shop_product'));
    const data = {
      act : 'shops.procCreateShopExt',
      user_id : get_data.user_id,
      user_no : get_data.user_no,
      user_name : get_data.user_name,
      shop_no : get_data.shop_no,
      product_no : get_data.shop_product.no
    };
    this.APIService.sendApi(data).then( res => {
      if ( res.error !== -1) {
        swal('변경사항이 저장 되었습니다.');
      }
    });
  }

}
