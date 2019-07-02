import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAddShopsStep1Component } from './shop-add-shops-step1.component';

describe('ShopAddShopsStep1Component', () => {
  let component: ShopAddShopsStep1Component;
  let fixture: ComponentFixture<ShopAddShopsStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopAddShopsStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopAddShopsStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
