import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-board-management',
  templateUrl: './board-management.component.html',
  styleUrls: ['./board-management.component.css']
})
export class BoardManagementComponent implements OnInit {
  p: any; type: any; page: number; boards = []; act: any;
  board_page: number; comment_page: number; nomal_page: number; manager_page: number;
  totalpage: number; pagenation = []; number: number; pagenation_class: any; prev_pages: any; prev_class: any;
  next_pages: any; next_class: any;
  board_active: any; comment_active: any; manager_active: any; nomal_active: any;
  constructor( private route: ActivatedRoute,
                private APIService: ApiService ,
                private location: Location ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.p = params['page'];
      this.type = params['type'];
      this.comment_active = '';
      this.board_active = '';
      this.manager_active = '';
      this.nomal_active = '';
      if ( this.type === 'board') {
        this.board_page = +this.p;
        this.page = this.board_page;
        this.board_active = 'active';
        this.getBoardContent();
      } else if ( this.type === 'comment') {
        this.comment_page = +this.p;
        this.page = this.comment_page;
        this.getBoardContent();
        this.comment_active = 'active';
      } else if ( this.type === 'manager') {
        this.manager_page = +this.p;
        this.page = this.manager_page;
        this.getBoardContent();
        this.manager_active = 'active';
      } else if ( this.type === 'nomal') {
        this.nomal_page = +this.p;
        this.page = this.nomal_page;
        this.getBoardContent();
        this.nomal_active = 'active';
      }
    });
    console.log(this.nomal_active);
  }

  tab(event) {
    this.pagenation = [];
    if ( event.target.name === 'board') {
      if (this.board_page === undefined) {
        this.board_page = 1;
      } else {
        this.page = this.board_page;
      }
      this.type = event.target.name;
      this.location.go('master/BoardManage?page=' + this.board_page + '&type=' + this.type);
      this.getBoardContent();
    } else if ( event.target.name === 'comment') {
      if (this.comment_page === undefined) {
        this.comment_page = 1;
      } else {
        this.page = this.comment_page;
      }
      this.type = event.target.name;
      this.location.go('master/BoardManage?page=' + this.comment_page + '&type=' + this.type);
      this.getBoardContent();
    } else if ( event.target.name === 'manager') {
      if (this.manager_page === undefined) {
        this.manager_page = 1;
      } else {
        this.page = this.manager_page;
      }
      this.type = event.target.name;
      this.location.go('master/BoardManage?page=' + this.manager_page + '&type=' + this.type);
      this.getBoardContent();
    } else if ( event.target.name === 'nomal') {
      if (this.nomal_page === undefined) {
        this.nomal_page = 1;
      } else {
        this.page = this.nomal_page;
      }
      this.type = event.target.name;
      this.location.go('master/BoardManage?page=' + this.nomal_page + '&type=' + this.type);
      this.getBoardContent();
    }
  }

  getBoardContent() {
    if ( this.type === 'board') {
      this.act = 'masters.procGetAllBoardContent';
    } else if ( this.type === 'comment') {
      this.act = 'masters.procGetAllBoardComments';
    } else if ( this.type === 'manager') {
      this.act = 'masters.procGetMAnnounceContent';
    } else if ( this.type === 'nomal') {
      this.act = 'masters.procGetAnnounceContent';
    }
    const data = {
      act : this.act,
      page: this.page
    };
    this.APIService.sendApi(data).then( res => {
      if (res.error !== -1) {
        console.log(res);
        this.boards = [];
        for (let i = 0; i < res.variables.count; i++) {
          if (res.variables.data[i].type) {
            if ( res.variables.data[i].type === 'free' ) {
              res.variables.data[i].type = '자유 게시판';
            } else if ( res.variables.data[i].type === 'announce' ) {
              res.variables.data[i].type = '공지 게시판';
            } else if ( res.variables.data[i].type === 'event' ) {
              res.variables.data[i].type = '이벤트 게시판';
            } else if ( res.variables.data[i].type === 'manager' ) {
              res.variables.data[i].type = '사장님 게시판';
            } else if ( res.variables.data[i].type === 'recom' ) {
              res.variables.data[i].type = '추천 게시판';
            } else if ( res.variables.data[i].type === 'Mannounce' ) {
              res.variables.data[i].type = '사장님 공지 게시판';
            }
          }
          this.boards.push(
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
      this.location.go('master/BoardManage?page=' + this.page + '&type=' + this.type);
      if (this.type === 'board') {
        this.board_page = this.page;
        this.getBoardContent();
      } else if (this.type === 'comment') {
        this.comment_page = this.page;
        this.getBoardContent();
      } else if (this.type === 'nomal') {
        this.comment_page = this.page;
        this.getBoardContent();
      }
    }
  }

  /* 페이지 네이션 선택 페이지 번호로 이동 */
  move_page(event, page) {
    if (this.page !== page.page) {
      this.page = page.page;
      this.location.go('master/BoardManage?page=' + this.page + '&type=' + this.type);
      if (this.type === 'board') {
        this.board_page = this.page;
        this.getBoardContent();
      } else if (this.type === 'comment') {
        this.comment_page = this.page;
        this.getBoardContent();
      } else if (this.type === 'nomal') {
        this.nomal_page = this.page;
        this.getBoardContent();
      } else if (this.type === 'manager') {
        this.manager_page = this.page;
        this.getBoardContent();
      }
    }
  }

  move_prev_pages() {
    if (this.page !== 1) {
      this.page -= 1;
      this.location.go('master/BoardManage?page=' + this.page + '&type=' + this.type);
      if (this.type === 'board') {
        this.board_page = this.page;
        this.getBoardContent();
      } else if (this.type === 'comment') {
        this.comment_page = this.page;
        this.getBoardContent();
      } else if (this.type === 'nomal') {
        this.comment_page = this.page;
        this.getBoardContent();
      } else if (this.type === 'manager') {
        this.manager_page = this.page;
        this.getBoardContent();
      }
    }
  }

  moveThePage(list) {
    console.log(list.no);
    console.log(this.page);
    console.log(this.type);
    window.location.href = 'master/BoardManageDetail?page=' + this.page + '&type=' + this.page + '&no=' + list.no;
  }

  moveTheAnPage(list){
    console.log(list.no);
    console.log(this.page);
    console.log(this.type);
    window.location.href = 'master/BoardAnnounDetail?page=' + this.page + '&type=' + this.page + '&no=' + list.no;
  }
}
