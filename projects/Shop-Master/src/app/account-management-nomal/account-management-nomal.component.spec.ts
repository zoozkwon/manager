import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountManagementNomalComponent } from './account-management-nomal.component';

describe('AccountManagementNomalComponent', () => {
  let component: AccountManagementNomalComponent;
  let fixture: ComponentFixture<AccountManagementNomalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountManagementNomalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountManagementNomalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
