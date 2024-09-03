export default class Game {
  constructor() {
    this.answer = new Uint8Array(4);

    this.start();
  }

  start() {
    for (let i = 0; i < 4; ++i) {
      this.answer[i] = Math.floor(Math.random() * 6) + 1;
    }
  }

  guess(sequence) {
    let matches = 0;
    let hits = 0;

    if (sequence.length != 4)
      throw new TypeError(
        `expected array-like object of length 4, received length ${sequence.length}`
      );

    for (let i = 0; i < 4; ++i) {
      if (sequence[i] == this.answer[i]) {
        matches += 1;
      } else {
        for (let j = 0; j < 4; ++j) {
          if (sequence[i] == this.answer[j])
            hits += 1;
            break;
        }
      }
    }

    const result = {
      sequence,
      matches,
      hits,
    };

    return result;
  }
}
