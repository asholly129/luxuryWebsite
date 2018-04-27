import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdManageInstituteComponent } from './ad-manage-institute.component';

describe('AdManageInstituteComponent', () => {
  let component: AdManageInstituteComponent;
  let fixture: ComponentFixture<AdManageInstituteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdManageInstituteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdManageInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
