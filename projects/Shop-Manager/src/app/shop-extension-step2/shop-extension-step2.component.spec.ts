import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopExtensionStep2Component } from './shop-extension-step2.component';

describe('ShopExtensionStep2Component', () => {
  let component: ShopExtensionStep2Component;
  let fixture: ComponentFixture<ShopExtensionStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopExtensionStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopExtensionStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
