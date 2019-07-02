import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-shop-reviews-manage',
  templateUrl: './shop-reviews-manage.component.html',
  styleUrls: ['./shop-reviews-manage.component.css']
})
export class ShopReviewsManageComponent implements OnInit {
  n: any; shop_no: number; replys = [];
  page: any; reviews = []; totalpage: any; pagenation= []; number: any; GPA: any;
  pagenation_class: any; prev_pages: any; prev_class: any; next_pages: any; next_class: any;
  @ViewChild('reply_content') reply_content: ElementRef;
  @ViewChild('reply_up_content') reply_up_content: ElementRef;
  userthumbnailUrl: any;
  constructor( private route: ActivatedRoute,
               private APIService: ApiService ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.n = params['no'];
      this.shop_no = +this.n;
      const data = (
          'user_thumbnail'
      );
      this.APIService.getUrl(data).then( res => {
        this.userthumbnailUrl = res ;
      });
      this.getMyReviews();
      this.page = 1;
    });
  }

  getMyReviews() {
    const user = JSON.parse(localStorage.getItem('manager_users'));
    const data = {
      act : 'shops.procGetManageWriteReviews',
      user_no : user.no,
      shop_no : this.shop_no,
      page : this.page
    };
    this.APIService.sendApi(data).then(res => {
      this.reviews = [];
      for (let i = 0; i < res.variables.count; i++) {
        res.variables.data[i].user_thumbnail = this.userthumbnailUrl + res.variables.data[i].user_thumbnail;
        res.variables.data[i].replyForm = true;
        res.variables.data[i].replyComment = true;

        this.reviews.push(
            res.variables.data[i]
        );
      }

      this.totalpage = res.variables.totalpage;
      this.pagenation = [];
      this.number = 1;
      if (this.totalpage !== 0) {
        for (let i = 0; i < this.totalpage; i++) {
          if (this.number === this.page) {
            this.pagenation_class = 'active';
          } else {
            this.pagenation_class = '';
          }
          this.pagenation.push({
            page: this.number,
            active_class: this.pagenation_class
          });
          this.number += 1;
        }
        if (this.page === 1) {
          this.prev_pages = 'disabled';
          this.prev_class = '';
        } else {
          this.prev_pages = '';
          this.prev_class = 'pagination_active';
        }
        if (this.page === res.variables.totalpage) {
          this.next_pages = 'disabled';
          this.next_class = '';
        } else {
          this.next_pages = '';
          this.next_class = 'pagination_active';
        }
      }
    });
  }

  showReplys(review) {
    if ( review.replyComment !== false ) {
      for (let i = 0; i < this.reviews.length; i++) {
        this.reviews[i].replyComment = true;
      }
      review.replyComment = false;
      const data = {
        act : 'shops.procGetReviewReplys',
        review_no : review.no,
      };
      this.APIService.sendApi(data).then( res => {
        if (res.error !== -1) {
          this.replys = [];
          for (let i = 0; i < res.variables.count; i++) {
            res.variables.data[i].user_thumbnail = this.userthumbnailUrl + res.variables.data[i].user_thumbnail;
            res.variables.data[i].rewrite = true;
            this.replys.push(
                res.variables.data[i]
            );
          }
        }
      });
    } else {
      review.replyComment = true;
    }
  }

  /* 리뷰 대댓글 입력창 */
  reply_form(review) {
    for (let i = 0; i < this.reviews.length; i++) {
      this.reviews[i].replyForm = true;
    }
    review.replyForm = false;
  }

  reply_cancel() {
    for (let i = 0; i < this.reviews.length; i++) {
      this.reviews[i].replyForm = true;
    }
  }

  /* 페이지 네이션 선택 페이지 번호로 이동 */
  move_page(event, page) {
    this.page = page.page;
    this.getMyReviews();
  }

  move_prev_pages() {
    if (this.page !== 1) {
      this.page -= 1;
      this.getMyReviews();
    }

  }

  move_next_pages() {
    if (this.page !== this.totalpage) {
      this.page += 1;
      this.getMyReviews();
    }
  }

  /* 리뷰 대댓글 작성 */
  write_reply(review) {
    const user = JSON.parse(localStorage.getItem('manager_users'));
    const data = {
      act : 'datas.procWriteReviewReply',
      user_id : user.id,
      user_name : user.name,
      user_no : user.no,
      reply_content : this.reply_content.nativeElement.value,
      review_no : review.no,
      shop_no : this.shop_no
    };
    this.APIService.sendApi(data).then( res => {
      if (res.error !== -1) {
        swal('댓글 작성이 완료되었습니다.').then( value => {
          this.getMyReviews();
        });
      }
    });
  }

  rewrite_update(review, reply) {
    const data = {
      act: 'datas.procUpdateReviewReply',
      reply_no : reply.no,
      shop_no : this.shop_no,
      reply_content : this.reply_up_content.nativeElement.value
    };
    console.log(data);
    this.APIService.sendApi(data).then( res => {
      if (res.error !== -1) {
        swal('댓글을 수정했습니다').then( value => {
          for (let i = 0; i < this.reviews.length; i++) {
            this.showReplys(review);
          }
        });
      }
    });
  }

  rewrite_reply(reply) {
    if ( reply.rewrite !== false) {
      for (let i = 0; i < this.replys.length; i++) {
        this.replys[i].rewrite = true;
      }
      reply.rewrite = false;
    } else {
      reply.rewrite = true;
    }
  }

  rewrite_can(reply) {
    reply.rewrite = true;
  }
}
