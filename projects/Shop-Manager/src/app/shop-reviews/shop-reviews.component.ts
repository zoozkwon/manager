import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-reviews',
  templateUrl: './shop-reviews.component.html',
  styleUrls: ['./shop-reviews.component.css']
})
export class ShopReviewsComponent implements OnInit {
  items = []; logoUrl: any;
  constructor( private APIService: ApiService , private router: Router ) { }

  ngOnInit() {
    const data = (
        'logo'
    );
    this.APIService.getUrl(data).then( res => {
      this.logoUrl = res ;
    });
    this.Shops();
  }

  Shops() {
    const users = JSON.parse(localStorage.getItem( 'manager_users' ));
    const data = {act : 'datas.procManagerGetProducts', id : users.id };
    this.APIService.sendApi(data).then( res => {
      if (res.error === 0) {
        const Shops = res.variables.data;
        for ( let i = 0; i < res.variables.count; i++) {
          res.variables.data[i].logo = this.logoUrl + res.variables.data[i].logo;
          this.items.push(
              Shops[i]
          );
        }
      }
    });
  }
  moveThePage(shop) {
    window.location.href = 'manager/ShopReviews/Manage?no=' + shop.no;
  }
}
