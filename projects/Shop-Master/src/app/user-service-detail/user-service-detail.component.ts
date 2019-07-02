import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-user-service-detail',
  templateUrl: './user-service-detail.component.html',
  styleUrls: ['./user-service-detail.component.css']
})
export class UserServiceDetailComponent implements OnInit {
  no: any; querstions = []; comments = []; page: any; comment_count: any;
  @ViewChild('answer_content') answer_content: ElementRef;

  constructor( private APIService: ApiService , private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.no = params['no'];
      this.page = params['page'];
    });
    this.GetQuerstion();
    this.GetQuerstionComments();
  }

  GetQuerstion() {
    const data = {
      querstion_no : this.no,
      act : 'masters.procGetQuerstion'
    };
    this.APIService.sendApi(data).then(res => {
      if ( res.error !== -1 ) {
        this.querstions.push(
            res.variables.data
        );
      }
      console.log(this.querstions);
    });
  }

  GetQuerstionComments() {
    const user = JSON.parse(localStorage.getItem('master_users'));
    const data = {
      querstion_no : this.no,
      act : 'masters.procGetQuerstionComments'
    };
    this.APIService.sendApi(data).then(res => {
      if (res.error !== -1) {
        this.comments = [];
        this.comment_count = res.variables.count;
        for (let i = 0; i < res.variables.count; i++) {
          if (res.variables.data[i].master === 'Y') {
            res.variables.data[i].master = '관리자';
          } else {
            res.variables.data[i].master = '';
          }
          if ( res.variables.data[i].writer_no === user.no ) {
            res.variables.data[i].writer = 'Y';
          } else {
            res.variables.data[i].writer = 'N';
          }
          res.variables.data[i].comment_form = false;
          this.comments.push(
              res.variables.data[i]
          );
        }
      }
    });
  }

  comment_write(comment) {
    if (comment.comment_form === true) {
      comment.comment_form = false;
    } else {
      for (let i = 0; i < this.comments.length; i++) {
        this.comments[i].comment_form = false;
      }
      comment.comment_form = true;
    }
    console.log(this.comments);
  }

  answers() {
    const users = JSON.parse(localStorage.getItem('master_users'));
    const data = {
      act : 'masters.procQuerstionAnswer',
      querstion_no : this.no,
      answer_content : this.answer_content.nativeElement.value,
      writer_no: users.no,
      writer_name : users.name,
      writer_id : users.id,
    };
    this.APIService.sendApi(data).then( res => {
      console.log(res);
      if (res.error !== -1) {
        swal('작성이 완료되었습니다.');
        this.GetQuerstionComments();
      }
    });
  }
}
