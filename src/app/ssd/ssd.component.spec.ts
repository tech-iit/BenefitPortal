import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsdComponent } from './ssd.component';

describe('SsdComponent', () => {
  let component: SsdComponent;
  let fixture: ComponentFixture<SsdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SsdComponent]
    });
    fixture = TestBed.createComponent(SsdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
