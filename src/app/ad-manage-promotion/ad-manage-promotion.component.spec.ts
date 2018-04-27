import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdManagePromotionComponent } from './ad-manage-promotion.component';

describe('AdManagePromotionComponent', () => {
  let component: AdManagePromotionComponent;
  let fixture: ComponentFixture<AdManagePromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdManagePromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdManagePromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
