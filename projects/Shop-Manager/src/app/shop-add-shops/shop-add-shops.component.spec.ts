import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAddShopsComponent } from './shop-add-shops.component';

describe('ShopAddShopsComponent', () => {
  let component: ShopAddShopsComponent;
  let fixture: ComponentFixture<ShopAddShopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopAddShopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopAddShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
