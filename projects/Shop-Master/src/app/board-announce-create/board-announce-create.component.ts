import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-board-announce-create',
  templateUrl: './board-announce-create.component.html',
  styleUrls: ['./board-announce-create.component.css']
})
export class BoardAnnounceCreateComponent implements OnInit {

  @ViewChild('title') title: ElementRef;
  @ViewChild('board_type') board_type: ElementRef;
  @ViewChild('content') content: ElementRef;

  constructor( private APIService: ApiService ,
               private location: Location ) { }

  ngOnInit() {
  }

  create() {
    const user = JSON.parse(localStorage.getItem('master_users'));
    const data = {
      act : 'masters.procCreateBoardContent',
      title : this.title.nativeElement.value,
      content : this.content.nativeElement.value,
      user_id : user.id,
      user_no : user.no,
      user_name : user.name,
      type : this.board_type.nativeElement.value
    };
    this.APIService.sendApi(data).then( res => {
      if  (res !== -1) {
        swal('게시글이 작성되었습니다.').then( value => {
          this.location.back();
        });
      }
    });
  }

  back() {
    this.location.back();
  }
}
