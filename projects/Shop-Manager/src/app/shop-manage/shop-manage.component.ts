import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import '../../assets/js/summernotes.js';
import '../../assets/js/file_upload.js';

@Component({
  selector: 'app-shop-manage',
  templateUrl: './shop-manage.component.html',
  styleUrls: ['./shop-manage.component.css']
})
export class ShopManageComponent implements OnInit {
  n: any; no: number;
  constructor( private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.n = params['no'];
    });
    this.no = +this.n;
  }

}
