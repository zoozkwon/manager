import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardAnnounceCreateComponent } from './board-announce-create.component';

describe('BoardAnnounceCreateComponent', () => {
  let component: BoardAnnounceCreateComponent;
  let fixture: ComponentFixture<BoardAnnounceCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardAnnounceCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardAnnounceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
