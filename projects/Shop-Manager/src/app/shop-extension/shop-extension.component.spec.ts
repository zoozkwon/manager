import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopExtensionComponent } from './shop-extension.component';

describe('ShopExtensionComponent', () => {
  let component: ShopExtensionComponent;
  let fixture: ComponentFixture<ShopExtensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopExtensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
