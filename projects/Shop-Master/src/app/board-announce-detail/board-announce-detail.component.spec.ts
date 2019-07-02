import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardAnnounceDetailComponent } from './board-announce-detail.component';

describe('BoardAnnounceDetailComponent', () => {
  let component: BoardAnnounceDetailComponent;
  let fixture: ComponentFixture<BoardAnnounceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardAnnounceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardAnnounceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
