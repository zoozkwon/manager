import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-shop-add-shops-step1',
  templateUrl: './shop-add-shops-step1.component.html',
  styleUrls: ['./shop-add-shops-step1.component.css']
})
export class ShopAddShopsStep1Component implements OnInit {
  @ViewChild('Shop_Category') Shop_Category: ElementRef;
  @ViewChild('Shop_Name') Shop_Name: ElementRef;
  @ViewChild('subtitle') subtitle: ElementRef;
  @ViewChild('shop_content') shop_content: ElementRef;
  items = [];
  constructor( private route: ActivatedRoute,
               private APIService: ApiService ) { }

  ngOnInit() {
    localStorage.removeItem('shop_info');
    localStorage.removeItem('logo');
    localStorage.removeItem('banner');
    localStorage.removeItem('adress');
    this.Category();
  }
  /*카테고리 조회*/
  Category() {
    const data = {act: 'datas.procDirectory'};
    this.APIService.sendApi(data).then( data => {
      const Directorys = data.variables.data;
      if (this.items['id'] !== '') {
        this.items = [];
      }
      for (let i = 0; i < Directorys.length ; i++) {
        this.items.push({
          no : Directorys[i].no ,
          name: Directorys[i].name
        });
      }
    });
  }

  next() {
    if ( this.Shop_Name.nativeElement.value === '') {
      swal(' 샵 이름을 입력해주세요 ');
    } else {
      const data = {
        shop_name : this.Shop_Name.nativeElement.value,
        category : this.Shop_Category.nativeElement.value,
        sub_title : this.subtitle.nativeElement.value,
        shop_content : this.shop_content.nativeElement.value,
      };
      localStorage.setItem('shop_info', JSON.stringify(data));
      window.location.href = 'manager/ShopAddListing/step2';
    }
  }
}
