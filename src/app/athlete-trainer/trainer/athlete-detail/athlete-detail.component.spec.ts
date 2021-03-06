/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AthleteDetailComponent } from './athlete-detail.component';

describe('AthleteDetailComponent', () => {
  let component: AthleteDetailComponent;
  let fixture: ComponentFixture<AthleteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AthleteDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
