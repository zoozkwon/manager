import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardManageDetailComponent } from './board-manage-detail.component';

describe('BoardManageDetailComponent', () => {
  let component: BoardManageDetailComponent;
  let fixture: ComponentFixture<BoardManageDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardManageDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardManageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
