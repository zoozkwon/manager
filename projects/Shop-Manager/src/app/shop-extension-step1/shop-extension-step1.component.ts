import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-shop-extension-step1',
  templateUrl: './shop-extension-step1.component.html',
  styleUrls: ['./shop-extension-step1.component.css']
})
export class ShopExtensionStep1Component implements OnInit {
  type: any; solo_products = []; road_products = []; n: any; shop_no: number;
  constructor( private APIService: ApiService ,
               private route: ActivatedRoute ) { }
  ngOnInit() {
    localStorage.removeItem('ex_shop_product');
    this.route.queryParams.subscribe((params: Params) => {
      this.n = params['no'];
      this.shop_no = +this.n;
    });
    this.get_solo_shop_proeucts();
    this.get_road_shop_proeucts();
  }


  get_solo_shop_proeucts() {
    this.type = 'soloshop';
    const data = {act: 'datas.procShopAddProducts', type : this.type};
    this.APIService.sendApi(data).then( res => {
      for (let i = 0; i < res.variables.count ; i ++) {
        this.solo_products.push(
            res.variables.data[i]
        );
      }
    });
  }

  get_road_shop_proeucts() {
    this.type = 'roadshop';
    const data = {act: 'datas.procShopAddProducts', type : this.type};
    this.APIService.sendApi(data).then( res => {
      for (let i = 0; i < res.variables.count ; i ++) {
        this.road_products.push(
            res.variables.data[i]
        );
      }
    });
  }

  next(shop) {
    const user = JSON.parse(localStorage.getItem('manager_users'));
    const data = {
      shop_product : shop,
      shop_no : this.shop_no,
      user_no : user.no,
      user_id : user.id,
      user_name : user.name
    };
    localStorage.setItem('ex_shop_product', JSON.stringify(data));
    console.log(localStorage.getItem('ex_shop_product'));
    window.location.href = 'manager/ShopExt/step2?no=' + this.shop_no;
  }
}
