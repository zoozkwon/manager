import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-service',
  templateUrl: './user-service.component.html',
  styleUrls: ['./user-service.component.css']
})
export class UserServiceComponent implements OnInit {
  p: any; page: number; Querstions = [];
  totalpage: number; pagenation = []; number: number; pagenation_class: any; prev_pages: any; prev_class: any;
  next_pages: any; next_class: any;
  constructor(private route: ActivatedRoute,
              private APIService: ApiService,
              private readonly location: Location ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.p = params['page'];
      this.page = +this.p;
    });
    this.getQuestion();
  }

  getQuestion() {
    const data = {
      act: 'masters.procGetUserQuerstion',
      request: 'masterGetting',
      page: this.page
    };
    this.APIService.sendApi(data).then(res => {
      if (res.error !== -1) {
        this.Querstions = [];
        for (let i = 0; i < res.variables.count; i++) {
          if (res.variables.data[i].answer === 'Y') {
            res.variables.data[i].answer = '답변완료';
          } else {
            res.variables.data[i].answer = '미답변';
          }
          this.Querstions.push(
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


  move_next_pages() {
    if (this.page !== this.totalpage) {
      this.page += 1;
      this.location.go('master/UserService?page=' + this.page);
      this.getQuestion();
    }
  }

  /* 페이지 네이션 선택 페이지 번호로 이동 */
  move_page(event, page) {
    if (this.page !== page.page) {
      this.page = page.page;
      this.location.go('master/UserService?page=' + this.page);
      this.getQuestion();
    }
  }

  move_prev_pages() {
    if (this.page !== 1) {
      this.page -= 1;
      this.location.go('master/UserService?page=' + this.page);
      this.getQuestion();
    }
  }

  moveThePage(list) {
    window.location.href = 'master/UserServiceDetail?page=' + this.page + '&no=' + list.no ;
  }
}
