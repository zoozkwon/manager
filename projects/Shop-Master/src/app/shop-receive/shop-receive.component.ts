import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shop-receive',
  templateUrl: './shop-receive.component.html',
  styleUrls: ['./shop-receive.component.css']
})
export class ShopReceiveComponent implements OnInit {
  p: any; l: any; list: number;

  totalpage: number; pagenation = []; number: number; pagenation_class: any; prev_pages: any; prev_class: any;
  next_pages: any; next_class: any;
  ltotalpage: number; lpagenation = []; lnumber: number; lpagenation_class: any; lprev_pages: any; lprev_class: any;
  lnext_pages: any; lnext_class: any;
  page: number;
  items = []; receives = [];
  constructor(private route: ActivatedRoute,
              private APIService: ApiService,
              private readonly location: Location ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.p = params['page'];
      this.l = params['list'];
      this.page = +this.p;
      this.list = +this.l;
    });
    this.getReceiveShop();
    this.getReceiveList();
  }

  getReceiveShop() {
    const data = {
      act : 'masters.procGetShopReceiveShop',
      page : this.page
    };
    this.APIService.sendApi(data).then( res => {
      if ( res.error !== -1) {
        console.log(res);
        this.items = [];
        for (let i = 0; i < res.variables.count; i ++) {
          this.items.push(
              res.variables.data[i]
          );
        }
        this.totalpage = res.variables.totalpage;
        this.pagenation = [];
        this.number = 1;
        if (this.totalpage !== 0) {
          for (let i = 0; i < this.totalpage; i++) {
            if (this.number === this.page) {
              this.pagenation_class = 'active';
            } else {
              this.pagenation_class = '';
            }
            this.pagenation.push({
              page: this.number,
              active_class: this.pagenation_class
            });
            this.number += 1;
          }
          if (this.page === 1) {
            this.prev_pages = 'disabled';
            this.prev_class = '';
          } else {
            this.prev_pages = '';
            this.prev_class = 'pagination_active';
          }
          if (this.page === res.variables.totalpage) {
            this.next_pages = 'disabled';
            this.next_class = '';
          } else {
            this.next_pages = '';
            this.next_class = 'pagination_active';
          }
        }
      }
    });
  }

  move_next_pages(){
    if (this.page !== this.totalpage) {
      this.page += 1;
      this.location.go('master/ShopReceive?page=' + this.page + '&list=' + this.list);
      this.getReceiveShop();
    }
  }

  /* 페이지 네이션 선택 페이지 번호로 이동 */
  move_page(event, page) {
    this.page = page.page;
    this.location.go('master/ShopReceive?page=' + this.page + '&list=' + this.list);
    this.getReceiveShop();
  }

  move_prev_pages() {
    if (this.page !== 1) {
      this.page -= 1;
      this.location.go('master/ShopReceive?page=' + this.page + '&list=' + this.list);
      this.getReceiveShop();
    }
  }

  moveThePage(shop) {
    window.location.href = 'master/ShopReceiveDetail?page=' + this.page + '&list=' + this.list + '&no=' + shop.no + '&r=' + shop.receive_data.no;
  }

  getReceiveList() {
    const data = {
      act : 'masters.procGetShopReceiveList',
      page : this.list
    };
    this.APIService.sendApi(data).then( res => {
      if (res.error !== -1) {
        this.receives = [];
        for ( let i = 0; i < res.variables.count; i++ ) {
          this.receives.push(
              res.variables.data[i]
          );
        }
        this.ltotalpage = res.variables.totalpage;
        this.lpagenation = [];
        this.lnumber = 1;
        if (this.ltotalpage !== 0) {
          for (let i = 0; i < this.ltotalpage; i++) {
            if (this.lnumber === this.list) {
              this.lpagenation_class = 'active';
            } else {
              this.lpagenation_class = '';
            }
            this.lpagenation.push({
              page: this.lnumber,
              active_class: this.lpagenation_class
            });
            this.lnumber += 1;
          }
          if (this.list === 1) {
            this.lprev_pages = 'disabled';
            this.lprev_class = '';
          } else {
            this.lprev_pages = '';
            this.lprev_class = 'pagination_active';
          }
          if (this.list === res.variables.totalpage) {
            this.lnext_pages = 'disabled';
            this.lnext_class = '';
          } else {
            this.lnext_pages = '';
            this.lnext_class = 'pagination_active';
          }
        }
      }
    });
  }

  lmove_next_pages() {
    if (this.list !== this.ltotalpage) {
      this.list += 1;
      this.location.go('master/ShopReceive?page=' + this.page + '&list=' + this.list);
      this.getReceiveList();
    }
  }

  /* 페이지 네이션 선택 페이지 번호로 이동 */
  lmove_page(event, page) {
    this.list = page.page;
    this.location.go('master/ShopReceive?page=' + this.page + '&list=' + this.list);
    this.getReceiveList();
  }

  lmove_prev_pages() {
    if (this.list !== 1) {
      this.list -= 1;
      this.location.go('master/ShopReceive?page=' + this.page + '&list=' + this.list);
      this.getReceiveList();
    }
  }

}
