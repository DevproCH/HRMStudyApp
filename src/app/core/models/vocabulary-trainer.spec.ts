import { VocabularyTrainer } from './vocabulary-trainer';

describe('VocabularyTrainer', () => {
  it('should create an instance', () => {
    expect(new VocabularyTrainer("a", "b", [])).toBeTruthy();
  });
});
