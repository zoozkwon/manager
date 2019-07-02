import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAddShopsStep4Component } from './shop-add-shops-step4.component';

describe('ShopAddShopsStep4Component', () => {
  let component: ShopAddShopsStep4Component;
  let fixture: ComponentFixture<ShopAddShopsStep4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopAddShopsStep4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopAddShopsStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
