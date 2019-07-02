import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopManageCourseComponent } from './shop-manage-course.component';

describe('ShopManageCourseComponent', () => {
  let component: ShopManageCourseComponent;
  let fixture: ComponentFixture<ShopManageCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopManageCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopManageCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
