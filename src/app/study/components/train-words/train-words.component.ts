import { Component } from '@angular/core';
import { AlertifyService } from '../../../core/services/alertify.service';
import { DataManagerService } from '../../../core/services/data-manager.service';
import { WordPair } from '../../../core/models/word-pair';
import { VocabularyTrainer } from '../../../core/models/vocabulary-trainer';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { InsertFormData } from './../../models/insert-form-data';

@Component({
  selector: 'app-train-words',
  templateUrl: './train-words.component.html',
  styleUrl: './train-words.component.css'
})
export class TrainWordsComponent {
  constructor(private dataManager: DataManagerService,
    private fb: UntypedFormBuilder
  )
  {
    this.vocabularyData = dataManager.getVocabularyData();
    this.vocabularyData.wordPairs.forEach(p => {
      this.wordPairs.push(new WordPair(p.id, p.word1, p.word2));
      this.wordPairs.push(new WordPair(p.id, p.word1, p.word2));
    })

    this.shuffleArray(this.wordPairs);
    this.currentWordPair = this.wordPairs[0];
    this.languageSwitch = Math.random() < 0.5;
    this.showSolution = false;



    if (this.languageSwitch) {
      this.testedLanguage = this.vocabularyData.language1Name;
    }
    else {
      this.testedLanguage = this.vocabularyData.language2Name;
    }

    this.nextQuestion();
  }

  vocabularyData: VocabularyTrainer;
  wordPairs: WordPair[] = []; /* Wordpairs contains all word pairs multiple times! If the user makes a mistake, another pair will be added. */
  currentWordPair: WordPair; /* The word pair that is currently displayed*/
  testedLanguage: string;
  languageSwitch: boolean; /* Used to determine in which language the user is challenged */
  showSolution: boolean;
  lastAnswer: string = ""; /* Contains the user's anwer */
  currentSolution: string = ""; /* Contains the solution of the current word pair*/
  currentQuestion: string = ""; /* Contains the question of the current word pair*/


  /*
    Called when the user submitted his answer.
  */
  testAnswer(answer: string) : void {
    this.lastAnswer = answer;
    this.showSolution = true;
  }



  /*
    Called when the user has review his anwer.
  */
  continue() : void {
    // If the solution is wrong, add another pair.
    if (this.lastAnswer != this.getSolution()) {
      this.wordPairs.push(new WordPair(this.currentWordPair.id,
        this.currentWordPair.word1,
        this.currentWordPair.word2));
    }
    this.nextQuestion();

  }


  /*
    This function selects another word pair and displays it to the user
  */
  nextQuestion() : void {
    this.showSolution = false;
    this.shuffleArray(this.wordPairs);
    this.currentWordPair = this.wordPairs[0];
    this.currentSolution = this.getSolution();
    this.currentQuestion = this.getQuestion();
  }


  /*
    Returns the solution of the current word pair
  */
  getSolution() : string {
    return this.currentWordPair.getSolution(this.languageSwitch);
  }

  /*
    Returns the question of the current word pair
  */
  getQuestion() : string {
    return this.currentWordPair.getQuestion(this.languageSwitch);
  }


  /*
    Shuffles the given array
  */
  shuffleArray(array: WordPair[]) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }
}
