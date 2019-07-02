import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopManageComponent } from './shop-manage.component';

describe('ShopManageComponent', () => {
  let component: ShopManageComponent;
  let fixture: ComponentFixture<ShopManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
