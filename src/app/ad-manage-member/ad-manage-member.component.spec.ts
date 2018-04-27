import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdManageMemberComponent } from './ad-manage-member.component';

describe('AdManageMemberComponent', () => {
  let component: AdManageMemberComponent;
  let fixture: ComponentFixture<AdManageMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdManageMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdManageMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
