export class WordPair {
  private _id: string;
  private _word1: string;
  private _word2: string;

  get id() {
    return this._id;
  }

  get word1() {
    return this._word1;
  }

  get word2() {
    return this._word2;
  }


  constructor (id: string, word1: string, word2: string) {
    this._id = id;
    this._word1 = word1;
    this._word2 = word2;
  }

  setWords(word1: string, word2: string) : boolean {
    this._word1 = word1;
    this._word2 = word2;
    return true;
  }

  getSolution(wordSwitch: boolean) : string {
    return wordSwitch ? this._word2 : this._word1;
  }

  getQuestion(wordSwitch: boolean) : string {
    return wordSwitch ? this._word1 : this._word2;
  }
}
