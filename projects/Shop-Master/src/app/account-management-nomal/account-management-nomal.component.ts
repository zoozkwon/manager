import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-account-management-nomal',
  templateUrl: './account-management-nomal.component.html',
  styleUrls: ['./account-management-nomal.component.css']
})
export class AccountManagementNomalComponent implements OnInit {
  n: any; no: number; npage: number; nomals = []; mpage: number; m: any;

  @ViewChild('id') id: ElementRef;
  @ViewChild('name') name: ElementRef;
  @ViewChild('Pass') Pass: ElementRef;
  @ViewChild('email') email: ElementRef;
  @ViewChild('mobile') mobile: ElementRef;
  @ViewChild('point') point: ElementRef;
  @ViewChild('authority') authority: ElementRef;
  @ViewChild('approval') approval: ElementRef;
  @ViewChild('isShopAuth') isShopAuth: ElementRef;
  @ViewChild('is_Delete') is_Delete: ElementRef;

  constructor( private route: ActivatedRoute,
               private APIService: ApiService ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.no = params['no'];
      this.m = params['m'];
      this.n = params['n'];
      this.mpage = +this.m;
      this.npage = +this.n;
    });
    if (this.n !== '') {
      this.getuser();
    }
  }

  getuser() {
    const data = {
      act : 'masters.procGetNomalUserData',
      user_no : this.no
    };
    this.APIService.sendApi(data).then( res => {
      if (res.error !== -1) {
        this.nomals.push(
            res.variables.data
        );
      }
      console.log(this.nomals);
    });
  }

  update(user) {
    if ( this.id.nativeElement.value === '') {
      swal('아이디를 입력해주세요');
    } else if ( this.name.nativeElement.value === '') {
      swal('이름을 입력해주세요');
    } else {
      const data = {
        act : 'masters.procNomalSignup',
        no : user.no,
        id : this.id.nativeElement.value,
        name : this.name.nativeElement.value,
        pass : this.Pass.nativeElement.value,
        email : this.email.nativeElement.value,
        mobile : this.mobile.nativeElement.value,
        point : this.point.nativeElement.value,
        authority : this.authority.nativeElement.value,
        isShopAuth : this.isShopAuth.nativeElement.value,
        approval : this.approval.nativeElement.value,
        is_Delete : this.is_Delete.nativeElement.value,
      };
      this.APIService.sendApi(data).then( res => {
        if (res.error !== -1) {
          swal('변경사항이 저장 되었습니다');
        }
      });
      console.log(data);
    }
  }


  back() {
    window.location.href = 'master/AcountManage?m=' + this.mpage + '&n=' + this.npage;
  }

}
