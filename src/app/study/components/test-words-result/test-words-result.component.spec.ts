import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWordsResultComponent } from './test-words-result.component';

describe('TestWordsResultComponent', () => {
  let component: TestWordsResultComponent;
  let fixture: ComponentFixture<TestWordsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestWordsResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestWordsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
