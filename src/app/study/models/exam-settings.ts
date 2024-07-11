import { WordPair } from "../../core/models/word-pair";
import { ExamAnswer } from './exam-answer';

/*
  Used to keep track of the status of an exam
*/
export interface ExamSettings {
  finished: boolean;
  startTime: Date;
  endTime: Date | null;

  hasTimeLimit: boolean;
  scheduledEndTime: Date;
  goal: number;
  numberOfWords: number;

  upcomingWords: WordPair[];
  languageSwitch: boolean;
  answers: ExamAnswer[];

}
