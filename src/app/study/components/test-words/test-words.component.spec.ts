import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWordsComponent } from './test-words.component';

describe('TestWordsComponent', () => {
  let component: TestWordsComponent;
  let fixture: ComponentFixture<TestWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestWordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
