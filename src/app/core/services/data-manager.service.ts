import { Injectable } from '@angular/core';
import { VocabularyTrainer } from './../models/vocabulary-trainer';
import { VocabularyTrainerDto } from '../models/vocabulary-trainer-dto';
import { ExamSettings } from './../../study/models/exam-settings';
import { WordPair } from '../models/word-pair';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  constructor() { }



  getVocabularyData() : VocabularyTrainer {
    const data = localStorage.getItem("vocabularyData");
    if (!data) {
      const trainer = new VocabularyTrainer("Language1", "Language2", []);
      this.setVocabularyData(trainer);
      return trainer;
    }

    try {
      const parsedData = JSON.parse(data) as VocabularyTrainerDto;
      if (parsedData) {
        let result = new VocabularyTrainer(parsedData._language1Name, parsedData._language2Name, []);

        parsedData._wordPairs.forEach(el => {
          result.insertWordPairWithId(el._word1, el._word2, el._id);
        });
        return result;
      } else {
        localStorage.removeItem("vocabularyData");
        return this.getVocabularyData();
      }
    } catch (error) {
      localStorage.removeItem("vocabularyData");
      return this.getVocabularyData();
    }
  }

  getExamData() : ExamSettings | null {
    const data = localStorage.getItem("examData");
    if (!data) {
      return null;
    }

    try {
      const parsedData = JSON.parse(data) as ExamSettings;
      let wordPairs : any[] = parsedData.upcomingWords;
      parsedData.upcomingWords = [];
      wordPairs.forEach(p => {
        parsedData.upcomingWords.push(new WordPair(p._id, p._word1, p._word2));
      });
      return parsedData;
    }
    catch{

    }

    return null
  }

  setVocabularyData(data: VocabularyTrainer) {
    localStorage.setItem("vocabularyData", JSON.stringify(data));
  }

  setExamData(data: ExamSettings) {
    localStorage.setItem("examData", JSON.stringify(data));
  }

  deleteExam() {
    localStorage.removeItem("examData");
  }

  deleteData() {
    localStorage.removeItem("vocabularyData");
    localStorage.removeItem("examData");
  }
}
