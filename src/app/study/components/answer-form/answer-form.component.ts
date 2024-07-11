import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrl: './answer-form.component.css'
})
export class AnswerFormComponent {

  @Input() testedLanguage : string = "";
  @Input() currentQuestion: string = "";

  @Output() submittedAnswer: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb: UntypedFormBuilder) {
    this.testLanguageForm = this.fb.group({
      answer: ['', Validators.required],
    });
  }

  /*
    Triggered when the user submits the form. This function sends an event to the parent
  */
  submitAnswer() : void {
    this.submittedAnswer.emit(this.testLanguageForm.value.answer);
    this.testLanguageForm.reset();
  }

  testLanguageForm: UntypedFormGroup;

}




