import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-board-announce-detail',
  templateUrl: './board-announce-detail.component.html',
  styleUrls: ['./board-announce-detail.component.css']
})
export class BoardAnnounceDetailComponent implements OnInit {
  p: any; page: number; type: any; n: any; no: number;
  contents = []; text: string;

  @ViewChild('title') title: ElementRef;
  @ViewChild('content') content: ElementRef;

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
        this.text = res.variables.data.content;
        console.log(this.content);
        this.contents.push(
            res.variables.data
        );
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

  update() {
    const data = {
      act : 'masters.procUpdateBoardContent',
      board_no : this.no,
      title : this.title.nativeElement.value,
      content : this.content.nativeElement.value
    };
    this.APIService.sendApi(data).then( res => {
      if  (res !== -1) {
        console.log(res);
      }
    });
  }

  back() {
    window.location.href = '/master/BoardManage?page=' + this.page + '&type=' + this.type;
  }
}
