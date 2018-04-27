import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemHistoryComponent } from './mem-history.component';

describe('MemHistoryComponent', () => {
  let component: MemHistoryComponent;
  let fixture: ComponentFixture<MemHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
