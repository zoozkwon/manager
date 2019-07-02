import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-shop-management',
  templateUrl: './shop-management.component.html',
  styleUrls: ['./shop-management.component.css']
})
export class ShopManagementComponent implements OnInit {
  items = []; status: string ; users: any; time: any;
  totalpage: any; pagenation = []; number: number; p: any; page: number;
  pagenation_class: any; prev_pages: any; prev_class: any; next_pages: any; next_class: any;
  logoUrl: any;
  constructor( private route: ActivatedRoute,
               private APIService: ApiService ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.p = params['page'];
      this.page = +this.p;
    });
    const data = (
      'logo'
    );
    this.APIService.getUrl(data).then( res => {
      this.logoUrl = res ;
    });

    this.Shops();
  }

  Shops() {
    const data = {act : 'masters.procMasterGetProductsList', page : this.page };
    this.APIService.sendApi(data).then( res => {
      if (res.error === 0) {
        const Shops = res.variables.data;
        this.items = [];
        for ( let i = 0; i < res.variables.count; i++) {
          if ( Shops[i].status === 'Y' ) {
            this.status = '승인됨';
          } else
          if ( Shops[i].status === 'N' ) {
            this.status = '승인대기중';
          } else
          if ( Shops[i].status === 'P') {
            this.status = '기간 만료';
          }
          Shops[i].logo = this.logoUrl + Shops[i].logo;
          this.items.push({
            statuses: this.status,
            datas : Shops[i]
          });
          this.time = 3;
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

  /* 페이지 네이션 선택 페이지 번호로 이동 */
  move_page(event, page) {
    this.page = page.page;
    this.Shops();
  }

  move_prev_pages() {
    if (this.page !== 1) {
      this.page -= 1;
      this.Shops();
    }

  }

  move_next_pages() {
    if (this.page !== this.totalpage) {
      this.page += 1;
      this.Shops();
    }
  }

  moveThePage(item) {
    window.location.href = 'master/ShopManageDetail?page=' + this.page + '&no=' + item.datas.no;
  }
}
