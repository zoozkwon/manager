import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { console.log(JSON.parse(localStorage.getItem('master_users')));}

  ngOnInit() {
    if (localStorage.getItem('master_users') === null) {
      swal("에러","로그인이 필요합니다 로그인을 진행해주세요", "error");
      window.location.href = 'master/Login';
    }
  }

  logout() {
    swal("","로그아웃이 완료 되었습니다", "success");
    window.location.href = 'master/Login';
  }

}
