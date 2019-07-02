import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../_services/api.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-shop-add-shops-step3',
  templateUrl: './shop-add-shops-step3.component.html',
  styleUrls: ['./shop-add-shops-step3.component.css']
})
export class ShopAddShopsStep3Component implements OnInit {
  Dos = []; Gus = []; si: any;
  @ViewChild('Shop_Si') Shop_Si: ElementRef;
  @ViewChild('Shop_Gu') Shop_Gu: ElementRef;
  @ViewChild('adress') adress: ElementRef;
  @ViewChild('kakao') kakao: ElementRef;
  @ViewChild('blog') blog: ElementRef;
  constructor( private APIService: ApiService ) { }

  ngOnInit() {
    localStorage.removeItem('adress');
    this.get_citys();
    this.si = '강원도';
    this.get_gus();
  }


  get_citys() {
    const data = {act: 'datas.procGet_Si'};
    this.APIService.sendApi(data).then( res => {
      const city = res.variables;
      for (let i = 0; i < city.count ; i++) {
        this.Dos.push(
            city.data[i]
        );
      }
    });
  }

  get_gus() {
    const data = {act: 'datas.procGet_Gu' , si : this.si};
    this.APIService.sendApi(data).then( res => {
      const gu = res.variables;
      this.Gus = [];
      for (let i = 0; i < gu.count ; i++) {
        this.Gus.push(
            gu.data[i]
        );
      }
    });
  }

  SelectSi() {
    const data = {act: 'datas.procGet_Gu' , si : this.Shop_Si.nativeElement.value};
    this.APIService.sendApi(data).then( res => {
      const gu = res.variables;
      this.Gus = [];
      for (let i = 0; i < gu.count; i++) {
        this.Gus.push(
            gu.data[i]
        );
      }
    });
  }

  next() {
    if ( this.Shop_Si.nativeElement.value === ''){
      swal( '샵이 위치한 도시를 선택해주세요' );
    } else if ( this.Shop_Gu.nativeElement.value === ''){
      swal( '샵이 위치한 동을 선택해주세요' );
    } else {
      const data = {
        si : this.Shop_Si.nativeElement.value,
        gu : this.Shop_Gu.nativeElement.value,
        adress : this.adress.nativeElement.value,
        kakao : this.kakao.nativeElement.value,
        blog : this.blog.nativeElement.value
      };
      localStorage.setItem('adress', JSON.stringify(data));
      window.location.href="manager/ShopAddListing/step4";
    }
  }
}
