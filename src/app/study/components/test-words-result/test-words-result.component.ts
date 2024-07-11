import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ExamSettings } from '../../models/exam-settings';
import { ExamAnswer } from './../../models/exam-answer';

@Component({
  selector: 'app-test-words-result',
  templateUrl: './test-words-result.component.html',
  styleUrl: './test-words-result.component.css'
})

export class TestWordsResultComponent {

  @Input() examSettings: ExamSettings | null = null;
  @Output() reviewFinished : EventEmitter<void> = new EventEmitter<void>()

  displayedColumns: string[] = ['question', 'answer', 'correctAnswer'];
  dataSource: ExamAnswer[] = [];


  numberOfCorrectAnswers: number = 0;
  numberOfWrongAnswers: number = 0;
  numberOfQuestions: number = 0;
  ratio: number = 100;
  goal: number = 0;

  /*
    Called when the user reviewed his answer. Sends an event to the parent.
  */
  finishReview() : void {
    this.reviewFinished.emit();
  }

  /*
    Used to determine if the input changes
  */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['examSettings'] ) {
      this.updateDataSource();
    }
  }

  /*
    Called when the input changed. This function updates all variables
  */
  updateDataSource() : void {
    this.dataSource = this.examSettings?.answers ?? [];


    this.numberOfCorrectAnswers = 0;
    this.numberOfWrongAnswers = 0;
    this.numberOfQuestions = 0;
    this.goal = this.examSettings?.goal ?? 0;

    this.examSettings?.answers.forEach(a => {
      if (a.answer === a.correctAnswer) {
        this.numberOfCorrectAnswers++;
      }
      else {
        this.numberOfWrongAnswers++;
      }
      this.numberOfQuestions++;
    })

    if (this.numberOfQuestions == 0) {
      this.ratio = 100;
    }
    else {
      this.ratio = this.numberOfCorrectAnswers / this.numberOfQuestions * 100;
    }


  }



}
