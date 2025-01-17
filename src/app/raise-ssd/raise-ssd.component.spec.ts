import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseSsdComponent } from './raise-ssd.component';

describe('RaiseSsdComponent', () => {
  let component: RaiseSsdComponent;
  let fixture: ComponentFixture<RaiseSsdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaiseSsdComponent]
    });
    fixture = TestBed.createComponent(RaiseSsdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
