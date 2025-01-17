import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarksEmployeeComponent } from './bookmarks-employee.component';

describe('BookmarksEmployeeComponent', () => {
  let component: BookmarksEmployeeComponent;
  let fixture: ComponentFixture<BookmarksEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookmarksEmployeeComponent]
    });
    fixture = TestBed.createComponent(BookmarksEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
