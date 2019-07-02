import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import swal from 'sweetalert';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {
  managers = []; nomals = []; nnumber: number;
  m: any; n: any; mpage: number; npage: number; mtotalpage: any; mpagenation= []; mnumber: number;
  mpagenation_class: any; mprev_pages: any; mprev_class: any; mnext_pages: any; mnext_class: any;
  ntotalpage: any; npagenation = [];
  npagenation_class: any; nprev_pages: any; nprev_class: any; nnext_pages: any; nnext_class: any;
  constructor( private route: ActivatedRoute,
               private APIService: ApiService,
               private readonly location: Location ) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.m = params['m'];
      this.n = params['n'];
      this.mpage = +this.m;
      this.npage = +this.n;
    });
    this.getManager();
    this.getNomal();
  }

  getManager() {
    const master = JSON.parse(localStorage.getItem('master_users'));
    const data = {act: 'masters.procJoinManagerUsers' , id : master.id , page : this.mpage};
    this.APIService.sendApi(data).then( res => {
      if ( res.error !== -1) {
        this.managers = [];
        const users = res.variables.users;
        for (let i = 0; i < res.variables.count ; i++) {
          this.managers.push(
              users[i]
          );
        }
        this.mtotalpage = res.variables.totalpage;
        this.mpagenation = [];
        this.mnumber = 1;
        if (this.mtotalpage !== 0) {
          for (let i = 0; i < this.mtotalpage; i++) {
            if (this.mnumber === this.mpage) {
              this.mpagenation_class = 'active';
            } else {
              this.mpagenation_class = '';
            }
            this.mpagenation.push({
              page: this.mnumber,
              active_class: this.mpagenation_class
            });
            this.mnumber += 1;
          }
          if (this.mpage === 1) {
            this.mprev_pages = 'disabled';
            this.mprev_class = '';
          } else {
            this.mprev_pages = '';
            this.mprev_class = 'pagination_active';
          }
          if (this.mpage === res.variables.totalpage) {
            this.mnext_pages = 'disabled';
            this.mnext_class = '';
          } else {
            this.mnext_pages = '';
            this.mnext_class = 'pagination_active';
          }
        }
      }
    });
  }

  getNomal() {
    const master = JSON.parse(localStorage.getItem('master_users'));
    const data = {act: 'masters.procJoinNomalUsers' , id : master.id , page : this.npage};
    this.APIService.sendApi(data).then( res => {
      this.nomals = [];
      const users = res.variables.users;
      for (let i = 0; i < res.variables.count ; i++) {
        this.nomals.push(
            users[i]
        );
      }
      this.ntotalpage = res.variables.totalpage;
      this.npagenation = [];
      this.nnumber = 1;
      if (this.ntotalpage !== 0) {
        for (let i = 0; i < this.ntotalpage; i++) {
          if (this.nnumber === this.npage) {
            this.npagenation_class = 'active';
          } else {
            this.npagenation_class = '';
          }
          this.npagenation.push({
            page: this.nnumber,
            active_class: this.npagenation_class
          });
          this.nnumber += 1;
        }
        if (this.npage === 1) {
          this.nprev_pages = 'disabled';
          this.nprev_class = '';
        } else {
          this.nprev_pages = '';
          this.nprev_class = 'pagination_active';
        }
        if (this.npage === res.variables.totalpage) {
          this.nnext_pages = 'disabled';
          this.nnext_class = '';
        } else {
          this.nnext_pages = '';
          this.nnext_class = 'pagination_active';
        }
      }
    });
  }

  /* 페이지 네이션 선택 페이지 번호로 이동 */
  mmove_page(event, page) {
    this.mpage = page.page;
    this.location.go('master/AcountManage?m=' + this.mpage + '&n=' + this.npage );
    this.getManager();
  }

  mmove_prev_pages() {
    if (this.mpage !== 1) {
      this.mpage -= 1;
      this.location.go('master/AcountManage?m=' + this.mpage + '&n=' + this.npage );
      this.getManager();
    }

  }

  mmove_next_pages(){
    if(this.mpage !== this.ntotalpage) {
      this.mpage += 1;
      this.location.go('master/AcountManage?m=' + this.mpage + '&n=' + this.npage );
      this.getManager();
    }
  }

  /* 페이지 네이션 선택 페이지 번호로 이동 */
  nmove_page(event, page) {
    this.npage = page.page;
    this.location.go('master/AcountManage?m=' + this.mpage + '&n=' + this.npage );
    this.getNomal();
  }

  nmove_prev_pages() {
    if (this.npage !== 1) {
      this.npage -= 1;
      this.location.go('master/AcountManage?m=' + this.mpage + '&n=' + this.npage );
      this.getNomal();
    }

  }

  nmove_next_pages() {
    if (this.npage !== this.ntotalpage) {
      this.npage += 1;
      this.location.go('master/AcountManage?m=' + this.mpage + '&n=' + this.npage );
      this.getNomal();
    }
  }


  moveManagerDetailPage(user) {
    window.location.href = 'master/ManageDetail?m=' + this.mpage + '&n=' + this.npage  + '&no=' + user.no;
  }

  moveNomalDetailPage(user) {
    window.location.href = 'master/NomalDetail?m=' + this.mpage + '&n=' + this.npage + '&no=' + user.no;
  }
}
