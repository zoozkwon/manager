import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @ViewChild('id') id: ElementRef;
  @ViewChild('pass') pass: ElementRef;

  constructor( private APIService: ApiService , private router: Router ) { }
  ngOnInit() {}

  Login() {
    const data = {act : 'member.procShopManagerLogin', id : this.id.nativeElement.value, password : this.pass.nativeElement.value };
    this.APIService.loginApi(data).then( res => {
      if (res.error === 0) {
        swal('로그인이 완료 되었습니다.');
        localStorage.setItem( 'manager_users' , JSON.stringify(res.variables.users));
        this.router.navigate(['/manager/Home']);

      }
    });
  }

}
