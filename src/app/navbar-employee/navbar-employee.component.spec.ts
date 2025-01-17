import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarEmployeeComponent } from './navbar-employee.component';

describe('NavbarEmployeeComponent', () => {
  let component: NavbarEmployeeComponent;
  let fixture: ComponentFixture<NavbarEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarEmployeeComponent]
    });
    fixture = TestBed.createComponent(NavbarEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
