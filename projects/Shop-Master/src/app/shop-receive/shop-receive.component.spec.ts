import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopReceiveComponent } from './shop-receive.component';

describe('ShopReceiveComponent', () => {
  let component: ShopReceiveComponent;
  let fixture: ComponentFixture<ShopReceiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopReceiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
