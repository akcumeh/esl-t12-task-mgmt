import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskMgr } from './task-mgr';

describe('TaskMgr', () => {
  let component: TaskMgr;
  let fixture: ComponentFixture<TaskMgr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskMgr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskMgr);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
