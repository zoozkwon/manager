import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  users: any; userthumbnailUrl: any; user_thumbnail: any;
  constructor( private APIService: ApiService ) { }

  ngOnInit() {
    if (localStorage.getItem('manager_users') === null) {
      swal("에러","로그인이 필요합니다 로그인을 진행해주세요", "error").then( value => {
        window.location.href = '/manager/Login';
      });
    } else {
      const data = (
          'user_thumbnail'
      );
      this.APIService.getUrl(data).then( res => {
        this.userthumbnailUrl = res ;

        this.users = JSON.parse(localStorage.getItem('manager_users'));
        this.user_thumbnail = this.userthumbnailUrl + this.users.user_thumbnail;
      });
    }
  }

  logout() {
    swal("","로그아웃이 완료 되었습니다", "success").then( value => {
      window.location.href = '/manager/Login';
    });
  }

}
