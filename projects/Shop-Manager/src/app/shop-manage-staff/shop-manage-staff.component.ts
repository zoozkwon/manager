import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { ImagesService } from '../_services/images.service';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-shop-manage-staff',
  templateUrl: './shop-manage-staff.component.html',
  styleUrls: ['./shop-manage-staff.component.css']
})
export class ShopManageStaffComponent implements OnInit {
  staffs = []; n: any; shop_no: number; get_staffs = [];

  @ViewChild('newstaff_name') newstaff_name: ElementRef;
  @ViewChild('newstaff_age') newstaff_age: ElementRef;
  @ViewChild('newstaff_content') newstaff_content: ElementRef;
  @ViewChild('newstart_pm') newstart_pm: ElementRef;
  @ViewChild('newstart_hour') newstart_hour: ElementRef;
  @ViewChild('newstart_min') newstart_min: ElementRef;
  @ViewChild('newend_pm') newend_pm: ElementRef;
  @ViewChild('newend_hour') newend_hour: ElementRef;
  @ViewChild('newend_min') newend_min: ElementRef;

  @ViewChild('staff_name') staff_name: ElementRef;
  @ViewChild('staff_age') staff_age: ElementRef;
  @ViewChild('staff_content') staff_content: ElementRef;
  @ViewChild('start_pm') start_pm: ElementRef;
  @ViewChild('start_hour') start_hour: ElementRef;
  @ViewChild('start_min') start_min: ElementRef;
  @ViewChild('end_pm') end_pm: ElementRef;
  @ViewChild('end_hour') end_hour: ElementRef;
  @ViewChild('end_min') end_min: ElementRef;
  constructor( private _IMAGES: ImagesService,
               private route: ActivatedRoute,
               private APIService: ApiService ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.n = params['no'];
      this.shop_no = +this.n;
      this.get_staff();
    });
  }


  get_staff() {
    const data = {
      act : 'datas.procGetAllStaffs',
      shop_no : this.shop_no,
    };
    this.APIService.sendApi(data).then( res => {
      if (res.error === 0) {
        const staff = res.variables.data;
        this.staffs = [];
        for (let i = 0; i < res.variables.count; i++) {
          if (staff[i].work === 'Y') {
            staff[i].color = 'btn-primary';
            staff[i].work = '근무중';
          } else {
            staff[i].color = 'btn-danger';
            staff[i].work = '비번';
          }
          if (staff[i].deadline === 'Y') {
            staff[i].deat_color = 'btn-danger';
            staff[i].deadline = staff[i].reservation;
          } else {
            staff[i].deat_color = 'btn-primary';
            staff[i].deadline = '예약 가능';
          }
          if (staff[i].work_time === 'N') {
            staff[i].work_color = 'btn-danger';
            staff[i].work_time = '비표시';
          } else {
            staff[i].work_color = 'btn-primary';
            staff[i].work_time = '표시';
          }
          this.staffs.push(
              staff[i]
          );
        }
      }
    });
  }

  /*출 퇴근 전환*/
  change(staff) {
    const user = JSON.parse(localStorage.getItem('manager_users'));
    const data = {
      shop_no : this.shop_no,
      act: 'shops.procStaffsWorked',
      staff : staff,
      user_no : user.no
    };
    this.APIService.sendApi(data).then( res => {
      if (res.error !== -1) {
        this.get_staff();
      }
    });
  }

  /*출 퇴근 전환*/
  change_worktile(staff) {
    const user = JSON.parse(localStorage.getItem('manager_users'));
    const data = {
      shop_no : this.shop_no,
      act: 'shops.procStaffsShowWorkTile',
      staff : staff,
      user_no : user.no
    };
    this.APIService.sendApi(data).then( res => {
      if (res.error !== -1) {
        this.get_staff();
      }
    });
  }

  /*예약 마감 전환*/
  change_deadline(staff) {
    const user = JSON.parse(localStorage.getItem('manager_users'));
    const data = {
      shop_no : this.shop_no,
      act: 'shops.procStaffsDeadline',
      staff : staff,
      user_no : user.no
    };
    this.APIService.sendApi(data).then( res => {
      if (res.error !== -1) {
        this.get_staff();
      }
    });
  }

  GetStaffData(staff) {
    const data = {
      act : 'shops.procGetStaffData',
      staff_no : staff.no,
      shop_no : this.shop_no
    };
    this.APIService.sendApi(data).then( res => {
      if (res.error !== -1) {
        this.get_staffs = [];
        this.get_staffs.push(
            res.variables.data
        );
      }
    });
  }

  staff_update(staff) {
    const data = {
      act : 'shops.procStaffSetting',
      start_pm : this.start_pm.nativeElement.value,
      start_hour : this.start_hour.nativeElement.value,
      start_min : this.start_min.nativeElement.value,
      end_pm : this.end_pm.nativeElement.value,
      end_hour : this.end_hour.nativeElement.value,
      end_min : this.end_min.nativeElement.value,
      staff_name : this.staff_name.nativeElement.value,
      staff_age : this.staff_age.nativeElement.value,
      staff_content : this.staff_content.nativeElement.value,
      staff_no : staff.no,
      shop_no : this.shop_no
    };
    this.APIService.sendApi(data).then( res => {
      if ( res.error !== -1) {
        swal( '변경사항이 저장되었습니다.' );
        this.get_staff();
      }
    });
  }

  create_staff() {
    const data = {
      act : 'shops.procStaffAdd',
      start_pm : this.newstart_pm.nativeElement.value,
      start_hour : this.newstart_hour.nativeElement.value,
      start_min : this.newstart_min.nativeElement.value,
      end_pm : this.newend_pm.nativeElement.value,
      end_hour : this.newend_hour.nativeElement.value,
      end_min : this.newend_min.nativeElement.value,
      staff_name : this.newstaff_name.nativeElement.value,
      staff_age : this.newstaff_age.nativeElement.value,
      staff_content : this.newstaff_content.nativeElement.value,
      shop_no : this.shop_no
    };
    console.log(data);
    this.APIService.sendApi(data).then( res => {
      if ( res.error !== -1) {
        alert('새 직원을 추가했습니다.');
        this.get_staff();
      }
    });
  }
}
