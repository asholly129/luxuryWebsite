import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemFavCoursesComponent } from './mem-fav-courses.component';

describe('MemFavCoursesComponent', () => {
  let component: MemFavCoursesComponent;
  let fixture: ComponentFixture<MemFavCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemFavCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemFavCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
