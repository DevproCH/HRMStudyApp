import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainWordsComponent } from './train-words.component';

describe('TrainWordsComponent', () => {
  let component: TrainWordsComponent;
  let fixture: ComponentFixture<TrainWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainWordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
