/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AthletesOverviewComponent } from './athletes-overview.component';

describe('AthletesOverviewComponent', () => {
  let component: AthletesOverviewComponent;
  let fixture: ComponentFixture<AthletesOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AthletesOverviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AthletesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
