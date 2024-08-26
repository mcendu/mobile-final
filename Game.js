export default class Game {
  constructor() {
    this.answer = new Uint8Array(4);
    this.started = false;
    this.win = false;
  }

  start() {
    for (let i = 0; i < 4; ++i) {
      this.answer[i] = Math.floor(Math.random() * 6) + 1;
    }

    this.started = true;
    this.win = false;
  }

  guess(sequence) {
    if (!this.started) {
      throw new TypeError(`game is not started`);
    }

    let exact_matches = 0;
    let nonexact_matches = 0;

    if (sequence.length != 4)
      throw new TypeError(
        `expected array-like object of length 4, received length ${sequence.length}`
      );

    for (let i = 0; i < 4; ++i) {
      if (sequence[i] == this.answer[i]) {
        exact_matches += 1;
      } else {
        for (let j = 0; j < 4; ++j) {
          if (sequence[i] == this.answer[j])
            nonexact_matches += 1;
        }
      }
    }

    if (exact_matches == 4) {
      this.started = false;
      this.win = true;
    }

    const result = {
      guess: sequence,
      exact_matches,
      nonexact_matches,
    };

    return result;
  }
}
