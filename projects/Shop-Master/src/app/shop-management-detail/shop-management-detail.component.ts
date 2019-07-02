import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-shop-management-detail',
  templateUrl: './shop-management-detail.component.html',
  styleUrls: ['./shop-management-detail.component.css']
})
export class ShopManagementDetailComponent implements OnInit {
  p: any; page: number; n: any; no: number;
  shops = [];
  @ViewChild('active') active: ElementRef;
  @ViewChild('is_Delete') is_Delete: ElementRef;

  constructor( private route: ActivatedRoute,
               private APIService: ApiService ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.p = params['page'];
      this.n = params['no'];
      this.page = +this.p;
      this.no = +this.n;
    });
    this.shopdata();
  }

  shopdata() {
    const data = {
      act : 'masters.procGetShopData',
      shop_no : this.no
    };
    this.APIService.sendApi(data).then( res => {
      if (res.error !== -1) {
        this.shops.push(
            res.variables.data
        );
        console.log(res);
      }
    });
  }

  back() {
    window.location.href = 'master/ShopManage?page=' + this.page;
  }

  update(shop) {
    const data = {
      act : 'masters.procShopUpdate',
      shop_no : shop.no,
      is_Delete : this.is_Delete.nativeElement.value,
      active : this.active.nativeElement.value
    };
  }
}
