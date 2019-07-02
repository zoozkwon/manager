import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items = []; status: string ; users: any; time: any; logoUrl: any;
  constructor( private APIService: ApiService ) { }

  ngOnInit() {
    localStorage.removeItem('shop_info');
    localStorage.removeItem('logo');
    localStorage.removeItem('banner');
    localStorage.removeItem('adress');
    sessionStorage.removeItem('datas');
    sessionStorage.removeItem('request');
    const data = (
        'logo'
    );
    this.APIService.getUrl(data).then( res => {
      this.logoUrl = res ;
    });
    this.Shops();
  }

  Shops() {
    this.users = JSON.parse(localStorage.getItem( 'manager_users' ));
    const data = {act : 'datas.procManagerGetProducts', id : this.users.id };
    this.APIService.sendApi(data).then( res => {
      if (res.error === 0) {
        const Shops = res.variables.data;
        for ( let i = 0; i < res.variables.count; i++) {
          Shops[i].logo = this.logoUrl + Shops[i].logo;
          if ( Shops[i].status === 'Y' ) {
            this.status = '승인됨';
          } else
          if ( Shops[i].status === 'N' ) {
            this.status = '승인대기중';
          } else
          if ( Shops[i].status === 'P') {
            this.status = '기간 만료';
          }
          this.items.push({
            statuses: this.status,
            datas : Shops[i]
          });
          this.time = 3;
        }
      }
    });
  }

  moveThePage(item) {
    window.location.href = 'manager/ShopManage?no=' + item.datas.no ;
  }
}
