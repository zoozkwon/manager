import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopReviewsComponent } from './shop-reviews.component';

describe('ShopReviewsComponent', () => {
  let component: ShopReviewsComponent;
  let fixture: ComponentFixture<ShopReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
