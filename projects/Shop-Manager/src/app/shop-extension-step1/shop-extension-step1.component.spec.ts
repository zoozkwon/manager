import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopExtensionStep1Component } from './shop-extension-step1.component';

describe('ShopExtensionStep1Component', () => {
  let component: ShopExtensionStep1Component;
  let fixture: ComponentFixture<ShopExtensionStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopExtensionStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopExtensionStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
