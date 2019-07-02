import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  swal:any;
  constructor() { }

  ngOnInit() {
  }

  logout() {
    swal("에러","로그인이 필요합니다 로그인을 진행해주세요", "success");
  }

}
