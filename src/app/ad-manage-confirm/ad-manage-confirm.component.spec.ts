import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdManageConfirmComponent } from './ad-manage-confirm.component';

describe('AdManageConfirmComponent', () => {
  let component: AdManageConfirmComponent;
  let fixture: ComponentFixture<AdManageConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdManageConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdManageConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
