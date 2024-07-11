import { WordPair } from "./word-pair";

export class VocabularyTrainer {
  private _language1Name: string;
  private _language2Name: string;
  private _wordPairs: WordPair[];

  get language1Name() {
    return this._language1Name;
  }

  get language2Name() {
    return this._language2Name;
  }

  get wordPairs() {
    return this._wordPairs;
  }


  constructor(language1Name: string, language2Name: string, wordPairs: WordPair[]) {
    this._language1Name = language1Name;
    this._language2Name = language2Name;
    this._wordPairs = wordPairs;
  }

  /*
    Sets the names of the two languages
  */
  setLanguageNames(language1: string, language2: string) : boolean {
    if (language1 === language2) {
      return false;
    }
    this._language1Name = language1;
    this._language2Name = language2;
    return true;
  }

  /*
    Returns the id if successful
    Otherwise an empty string
  */
  insertWordPair(word1: string, word2: string): string {
    let id = this.generateUniqueId();
    return this.insertWordPairWithId(word1, word2, id);
  }

  /*
    Returns the id if successful
    Otherwise an empty string
  */
  insertWordPairWithId(word1: string, word2: string, id: string): string {

    if (this.containsPair(word1, word2)) {
      return "";
    }

    if (this.containsId(id)) {
      return "";
    }

    let pair = new WordPair(id, word1, word2);
    this._wordPairs.push(pair);
    return id;
  }

  /*
    Updates a word pair if one exists with the given id.
    Does not add a new one
  */
  editWordPair(id: string, word1: string, word2: string) : boolean {
    const index = this._wordPairs.findIndex(pair => pair.id === id);
    if (index !== -1) {
      this._wordPairs[index].setWords(word1, word2);
      return true;
    }
    return false;
  }

  /*
    Returns the word pair with the given id
  */
  deleteWordPair(id: string) {
    this._wordPairs = this._wordPairs.filter(pair => pair.id !== id);
  }


  /*
    Returns a unique id
  */
  private generateUniqueId(): string {
    // Taken from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }


  /*
    Returns true if one word pair contains the id
  */
  private containsId(id: string) : boolean {
    return this.wordPairs.filter(p => p.id == id).length > 0;
  }

  /*
    Returns true if one pair with the given parameter already exists
  */
  private containsPair(word1: string, word2: string): boolean {
    return this.wordPairs.filter(p => p.word1 == word1 && p.word2 == word2).length > 0;
  }


}
