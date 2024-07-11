import { WordPairDto } from "./word-pair-dto";

export interface VocabularyTrainerDto {
  _language1Name: string;
  _language2Name: string;
  _wordPairs: WordPairDto[];
}
