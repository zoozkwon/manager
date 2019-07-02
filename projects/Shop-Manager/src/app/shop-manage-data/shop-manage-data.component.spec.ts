import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopManageDataComponent } from './shop-manage-data.component';

describe('ShopManageDataComponent', () => {
  let component: ShopManageDataComponent;
  let fixture: ComponentFixture<ShopManageDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopManageDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopManageDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
