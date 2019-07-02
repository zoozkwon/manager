import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-shop-add-shops',
  templateUrl: './shop-add-shops.component.html',
  styleUrls: ['./shop-add-shops.component.css']
})
export class ShopAddShopsComponent implements OnInit {
  type: any; solo_products = []; road_products = [];
  constructor( private activatedRoute: ActivatedRoute ,
               private APIService: ApiService ,
               private router: Router ) { }

  ngOnInit() {
    localStorage.removeItem('shop_info');
    localStorage.removeItem('logo');
    localStorage.removeItem('banner');
    localStorage.removeItem('adress');
    localStorage.removeItem('shop_product');
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
    localStorage.setItem('shop_product', JSON.stringify(shop));
    console.log(JSON.parse(localStorage.getItem('shop_product')));
    window.location.href = 'manager/ShopAddListing/step1';
  }
}
