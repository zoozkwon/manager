import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountManagementManagerComponent } from './account-management-manager.component';

describe('AccountManagementManagerComponent', () => {
  let component: AccountManagementManagerComponent;
  let fixture: ComponentFixture<AccountManagementManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountManagementManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountManagementManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
