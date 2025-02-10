import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOomponentComponent } from './test-oomponent.component';

describe('TestOomponentComponent', () => {
  let component: TestOomponentComponent;
  let fixture: ComponentFixture<TestOomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestOomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestOomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
