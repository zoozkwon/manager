import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { ImagesService } from '../_services/images.service';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-shop-manage-course',
  templateUrl: './shop-manage-course.component.html',
  styleUrls: ['./shop-manage-course.component.css']
})
export class ShopManageCourseComponent implements OnInit {
  n: any; shop_no: number; courses = [];
  modal_course_no: any;
  modal_course_name: any;
  modal_course_content: any;
  modal_course_price: number;
  modal_course_sale_price: number;

  @ViewChild('new_course_Name') new_course_Name: ElementRef;
  @ViewChild('new_course_Content') new_course_Content: ElementRef;
  @ViewChild('new_price') new_price: ElementRef;
  @ViewChild('new_sale_price') new_sale_price: ElementRef;
  @ViewChild('up_course_Name') up_course_Name: ElementRef;
  @ViewChild('up_course_Content') up_course_Content: ElementRef;
  @ViewChild('up_price') up_price: ElementRef;
  @ViewChild('up_sale_price') up_sale_price: ElementRef;

  constructor( private _IMAGES: ImagesService,
               private route: ActivatedRoute,
               private APIService: ApiService ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.n = params['no'];
      this.shop_no = + this.n;
      this.getCourse();
    });
  }

  createCourse() {
    if ( this.new_course_Name.nativeElement.value === '' ) {
      swal( '코스 이름을 입력해주세요' );
    } else if ( this.new_price.nativeElement.value === '' ) {
      swal( '코스 가격을 입력해주세요' );
    } else {
      const data = {
        act : 'shops.procCourseAdd',
        shop_no : this.shop_no,
        course_name : this.new_course_Name.nativeElement.value,
        course_content : this.new_course_Content.nativeElement.value,
        price : this.new_price.nativeElement.value,
        sale_price : this.new_sale_price.nativeElement.value,
      };
      this.APIService.sendApi(data).then( res => {
        if (res.error !== -1) {
          alert('작성이 완료되었습니다.');
          this.getCourse();
        }
      });
    }
  }

  getCourse() {
    const data = {
      act : 'shops.procGetManageCourse',
      shop_no : this.shop_no,
    };
    this.APIService.sendApi(data).then( res => {
      if (res.error === 0) {
        const course = res.variables.data;
        this.courses = [];
        for (let i = 0; i < res.variables.count; i++) {
          this.courses.push(
              course[i]
          );
        }
      }
    });
  }

  /* 세일 전환 */
  change_sale(course){
    const data = {
      act : 'shops.procCourseChangeSale',
      course_no : course.no,
      represent : course.represent,
      shop_no : this.shop_no
    };
    this.APIService.sendApi(data).then( res => {
      if (res.error !== -1) {
        this.getCourse();
      }
    });
  }
  /* 공개 전환 */
  change_show(course){
    const data = {
      act : 'shops.procCourseChangeShow',
      course_no : course.no,
      shows : course.shows,
      shop_no : this.shop_no
    };
    this.APIService.sendApi(data).then( res => {
      if (res.error !== -1) {
        this.getCourse();
      }
    });
  }

  openModal(course) {
    this.modal_course_no = course.no;
    this.modal_course_name = course.course_name;
    this.modal_course_content = course.course_content;
    this.modal_course_price = course.price;
    this.modal_course_sale_price = course.sale_price;
  }

  courseUpdate() {
    const data = {
      act : 'shops.procCourseUpdate',
      course_no : this.modal_course_no,
      shop_no : this.shop_no,
      course_name : this.up_course_Name.nativeElement.value,
      course_content : this.up_course_Content.nativeElement.value,
      price : this.up_price.nativeElement.value,
      sale_price : this.up_sale_price.nativeElement.value,
    };
    this.APIService.sendApi(data).then( res => {
      if ( res.error !== -1) {
        alert('변경사항이 저장되었습니다.');
        this.getCourse();
      }
    });

  }

}
