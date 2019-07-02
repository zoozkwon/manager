import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-account-management-manager',
  templateUrl: './account-management-manager.component.html',
  styleUrls: ['./account-management-manager.component.css']
})
export class AccountManagementManagerComponent implements OnInit {
  n: any; no: number; npage: number; managers = []; mpage: number; m: any;

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
    this.getManager();
  }
  getManager() {
    const data = {
      act : 'masters.procGetManagerUserData',
      user_no : this.no
    };
    this.APIService.sendApi(data).then( res => {
      if (res.error !== -1) {
        this.managers.push(
            res.variables.data
        );
      }
    });
  }

  update(user) {
    if ( this.id.nativeElement.value === '') {
      swal('아이디를 입력해주세요');
    } else if ( this.name.nativeElement.value === '') {
      swal('이름을 입력해주세요');
    } else {
      const data = {
        act : 'masters.procMasterSignup',
        user_no : user.no,
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
          console.log(res);
        }
      });
      console.log(data);
    }
  }

  back() {
    window.location.href = 'master/AcountManage?m=' + this.mpage + '&n=' + this.npage;
  }

}
