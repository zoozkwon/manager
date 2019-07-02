import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopManageStaffComponent } from './shop-manage-staff.component';

describe('ShopManageStaffComponent', () => {
  let component: ShopManageStaffComponent;
  let fixture: ComponentFixture<ShopManageStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopManageStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopManageStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
