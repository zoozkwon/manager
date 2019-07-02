import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-board-manage-detail',
  templateUrl: './board-manage-detail.component.html',
  styleUrls: ['./board-manage-detail.component.css']
})
export class BoardManageDetailComponent implements OnInit {
  p: any; page: number; type: any; n: any; no: number;
  contents = [];

  constructor( private route: ActivatedRoute,
               private APIService: ApiService ,
               private location: Location ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.p = params['page'];
      this.type = params['type'];
      this.n = params['no'];

      this.page = +this.p;
      this.no = +this.n;
    });
    console.log(this.no);
    this.getBoardDetail();
  }

  getBoardDetail() {
    const data = {
      act: 'masters.procGetBoardDetail',
      board_no : this.no
    };
    console.log(data);
    this.APIService.sendApi(data).then( res => {
      if (res.variables.data.type) {
        if ( res.variables.data.type === 'free' ) {
          res.variables.data.type = '자유 게시판';
        } else if ( res.variables.data.type === 'announce' ) {
          res.variables.data.type = '공지 게시판';
        } else if ( res.variables.data.type === 'event' ) {
          res.variables.data.type = '이벤트 게시판';
        } else if ( res.variables.data.type === 'manager' ) {
          res.variables.data.type = '사장님 게시판';
        } else if ( res.variables.data.type === 'recom' ) {
          res.variables.data.type = '추천 게시판';
        } else if ( res.variables.data.type === 'Mannounce' ) {
          res.variables.data.type = '사장님 공지 게시판';
        }
      }
      if (res.error !== -1) {
        this.contents.push(
            res.variables.data
        );
        console.log(this.contents);
      }
    });
  }

  delete() {
    const data = {
      act : 'masters.procBoardContentDelete',
      board_no : this.no
    };
    this.APIService.sendApi(data).then( res => {
      if (res.error !== -1) {
        this.location.back();
      }
    });
  }


  back() {
    window.location.href = '/master/BoardManage?page=' + this.page + '&type=' + this.type;
  }
}
