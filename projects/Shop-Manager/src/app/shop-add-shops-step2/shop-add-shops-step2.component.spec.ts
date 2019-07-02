import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAddShopsStep2Component } from './shop-add-shops-step2.component';

describe('ShopAddShopsStep2Component', () => {
  let component: ShopAddShopsStep2Component;
  let fixture: ComponentFixture<ShopAddShopsStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopAddShopsStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopAddShopsStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
