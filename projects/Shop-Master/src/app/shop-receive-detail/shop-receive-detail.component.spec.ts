import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopReceiveDetailComponent } from './shop-receive-detail.component';

describe('ShopReceiveDetailComponent', () => {
  let component: ShopReceiveDetailComponent;
  let fixture: ComponentFixture<ShopReceiveDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopReceiveDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopReceiveDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
