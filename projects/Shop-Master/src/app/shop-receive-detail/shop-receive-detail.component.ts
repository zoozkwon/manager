import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shop-receive-detail',
  templateUrl: './shop-receive-detail.component.html',
  styleUrls: ['./shop-receive-detail.component.css']
})
export class ShopReceiveDetailComponent implements OnInit {
  p: any; l: any; list: number; page: number; n: any; no: number; r: any; receive_no: number;
  shops = []; receives = [];
  constructor(private route: ActivatedRoute,
              private APIService: ApiService,
              private readonly location: Location ) {
  }

  ngOnInit() {
      this.route.queryParams.subscribe((params: Params) => {
        this.p = params['page'];
        this.l = params['list'];
        this.n = params['no'];
        this.r = params['r'];
        this.page = +this.p;
        this.list = +this.l;
        this.no = +this.n;
        this.receive_no = +this.r;
      });
      this.getReceiveShop();
  }

  getReceiveShop() {
    const data = {
      act : 'masters.procGetReceiveShopData',
      shop_no : this.no,
      receive_no : this.receive_no
    };
    this.APIService.sendApi(data).then( res => {
      if (res.error !== -1) {
        console.log(res);
        this.shops.push(
            res.variables.data
        );
        this.receives.push(
            res.variables.receive
        );
      }
    });
  }

  back() {
    this.location.back();
  }
  }

