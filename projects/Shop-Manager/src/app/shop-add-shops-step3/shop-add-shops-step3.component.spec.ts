import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAddShopsStep3Component } from './shop-add-shops-step3.component';

describe('ShopAddShopsStep3Component', () => {
  let component: ShopAddShopsStep3Component;
  let fixture: ComponentFixture<ShopAddShopsStep3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopAddShopsStep3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopAddShopsStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
