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
    swal("","로그아웃이 완료 되었습니다", "success");
  }

}
