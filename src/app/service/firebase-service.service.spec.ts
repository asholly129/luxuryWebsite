import { TestBed, inject } from '@angular/core/testing';

import { CourseService } from './firebase-service.service';

describe('FirebaseServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseService]
    });
  });

  it('should be created', inject([CourseService], (service: CourseService) => {
    expect(service).toBeTruthy();
  }));
});
