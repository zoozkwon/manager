import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopReviewsManageComponent } from './shop-reviews-manage.component';

describe('ShopReviewsManageComponent', () => {
  let component: ShopReviewsManageComponent;
  let fixture: ComponentFixture<ShopReviewsManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopReviewsManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopReviewsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
