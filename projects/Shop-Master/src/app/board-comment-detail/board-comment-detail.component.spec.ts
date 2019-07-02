import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCommentDetailComponent } from './board-comment-detail.component';

describe('BoardCommentDetailComponent', () => {
  let component: BoardCommentDetailComponent;
  let fixture: ComponentFixture<BoardCommentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardCommentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardCommentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
