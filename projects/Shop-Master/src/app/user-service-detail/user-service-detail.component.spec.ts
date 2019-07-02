import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserServiceDetailComponent } from './user-service-detail.component';

describe('UserServiceDetailComponent', () => {
  let component: UserServiceDetailComponent;
  let fixture: ComponentFixture<UserServiceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserServiceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
