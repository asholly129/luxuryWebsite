import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdManageCoursesComponent } from './ad-manage-courses.component';

describe('AdManageCoursesComponent', () => {
  let component: AdManageCoursesComponent;
  let fixture: ComponentFixture<AdManageCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdManageCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdManageCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
