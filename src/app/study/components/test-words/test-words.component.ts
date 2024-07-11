import { Component } from '@angular/core';
import { AlertifyService } from './../../../core/services/alertify.service';
import { DataManagerService } from './../../../core/services/data-manager.service';
import { VocabularyTrainer } from '../../../core/models/vocabulary-trainer';
import { WordPair } from '../../../core/models/word-pair';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ExamSettings } from './../../models/exam-settings';
import { Subscription, interval } from 'rxjs';


@Component({
  selector: 'app-test-words',
  templateUrl: './test-words.component.html',
  styleUrl: './test-words.component.css'
})
export class TestWordsComponent {
  constructor(private alertify: AlertifyService,
    private dataManager: DataManagerService,
    private fb: UntypedFormBuilder
  )
  {
    this.vocabularyData = dataManager.getVocabularyData();


    this.startExamForm = this.fb.group({
      numberOfWords: ['', Validators.required],
      timelimit: ['', Validators.required],
      goal: ['', Validators.required],
    });


    this.examSettings = dataManager.getExamData();



    if (this.examSettings) {
      this.examNotStarted = false;
    }

    this.loadExam();
    this.startTimer();
  }


  startExamForm: UntypedFormGroup;
  vocabularyData: VocabularyTrainer;
  remainingTime: string = "";
  subscription: Subscription | undefined;

  languageSwitch: boolean = false;
  examNotStarted: boolean = true;
  examSettings: ExamSettings | null;
  testedLanguage: string = "";
  currentQuestion: string = "";
  correctAnswer: string = "";


  /*
    Load the exam
  */
  loadExam() : void {
    if (this.examSettings !== null) {
      this.languageSwitch = this.examSettings.languageSwitch;
      if (this.languageSwitch) {
        this.testedLanguage = this.vocabularyData.language1Name;
      }
      else {
        this.testedLanguage = this.vocabularyData.language2Name;
      }


      this.loadNextQuestion();
    }
  }


  /*
    Load next Exam question
  */
 loadNextQuestion() : void {
  if (this.examSettings !== null) {
    if (this.examSettings.upcomingWords.length == 0) {
      this.stopExam();
    }
    else {
      let nextPair : WordPair | undefined = this.examSettings?.upcomingWords.shift();
      if (nextPair === undefined) {
        return;
      }
      this.currentQuestion = nextPair.getQuestion(this.examSettings.languageSwitch);
      this.correctAnswer = nextPair.getSolution(this.examSettings.languageSwitch);
    }
  }

 }


  /*
    Reset the exam
  */
  resetExam() : void {
    this.dataManager.deleteExam();
    location.reload();
  }


  /*
    Cancels the exam and shows the result
    Set the input to true if the exam has been cancelled by the user or via a timeout. This is required to mark the current question as a failure
  */
  stopExam(userCancellation: boolean = false) : void {
    if (this.examSettings !== null) {
      this.examSettings.finished = true;
      this.examSettings.endTime = new Date();

      if (userCancellation) {
        this.examSettings?.answers.push({
          question: this.currentQuestion,
          correctAnswer: this.correctAnswer,
          answer: "Not Answered!"
        })
      }

      this.examSettings.upcomingWords.forEach(w => {
        this.examSettings?.answers.push({
          question: w.getQuestion(this.languageSwitch),
          correctAnswer: w.getSolution(this.languageSwitch),
          answer: "Not Answered!"
        })
      });

      this.dataManager.setExamData(this.examSettings);
    }


  }


  /*
    Submit the answer
  */
  submitAnswer(answer: string) : void {
    if (this.examSettings !== null) {
      this.examSettings.answers.push(
        {
          question: this.currentQuestion,
          answer: answer,
          correctAnswer: this.correctAnswer
        }
      );

      this.loadNextQuestion();
      if (this.examSettings !== null) {
        this.dataManager.setExamData(this.examSettings);
      }
    }
  }


  /*
    Start the exam
  */
  startExam() : void {
    if (this.startExamForm.value.goal < 0
        || this.startExamForm.value.goal > 100) {
          this.alertify.error("The goal must be between 0 and 100");
          return;
        }

    let endTime = new Date();
    endTime.setSeconds(endTime.getSeconds() + this.startExamForm.value.timelimit);

    this.examSettings = {
      startTime: new Date(),
      scheduledEndTime: endTime,
      endTime: null,
      numberOfWords: this.startExamForm.value.numberOfWords,
      finished: false,
      goal: this.startExamForm.value.goal,
      hasTimeLimit: this.startExamForm.value.timelimit != 0,
      languageSwitch: this.languageSwitch,
      answers: [],
      upcomingWords: []
    }

    let wordPairs = this.vocabularyData.wordPairs;
    this.shuffleArray(wordPairs);


    wordPairs.forEach((p, i) => {
      if (this.startExamForm.value.numberOfWords === 0
        || i < this.startExamForm.value.numberOfWords) {
          this.examSettings?.upcomingWords.push(p);
        }
    });

    this.examNotStarted = false;
    this.dataManager.setExamData(this.examSettings);
    this.loadExam();


  }

  /*
    Shuffles a given array
  */
  shuffleArray(array: WordPair[]) : void {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

  /*
    Start the timer
    The timer will automatically finish the exam when the time is over
  */
  startTimer() {
    this.subscription = interval(1000).subscribe(() => {
      if (!this.examSettings?.hasTimeLimit || this.examSettings?.finished) {
        return;
      }
      let examTime = this.examSettings?.scheduledEndTime ?? Date.now();
      const now = new Date();
      const difference = new Date(examTime).getTime() - now.getTime();

      if (difference <= 0) {
        this.remainingTime = '00:00:00';
        this.subscription?.unsubscribe();
        this.stopExam(true);
        return;
      }

      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      this.remainingTime = `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}:${this.padTo2Digits(seconds)}`;
    });
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
}
