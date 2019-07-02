import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopManagementDetailComponent } from './shop-management-detail.component';

describe('ShopManagementDetailComponent', () => {
  let component: ShopManagementDetailComponent;
  let fixture: ComponentFixture<ShopManagementDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopManagementDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
