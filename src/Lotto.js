const LOTTO_NUMBER_COUNT = 6;
const LOTTO_MIN_NUMBER = 1;
const LOTTO_MAX_NUMBER = 45;

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    this.#validateLength(numbers);
    this.#validateRange(numbers);
    this.#validateDuplication(numbers);
  }

  #validateLength(numbers) {
    if (numbers.length !== LOTTO_NUMBER_COUNT) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }

  #validateRange(numbers) {
    numbers.forEach((number) => {
      if (number < LOTTO_MIN_NUMBER || number > LOTTO_MAX_NUMBER) {
        throw new Error("[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.");
      }
    });
  }

  #validateDuplication(numbers) {
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      throw new Error("[ERROR] 로또 번호에 중복된 숫자가 있습니다.");
    }
  }

  getNumbers() {
    return [...this.#numbers];
  }

  getMatchCount(winningNumbers) {
    return this.#numbers.filter((number) => winningNumbers.includes(number)).length;
  }

  hasBonusNumber(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }
  // TODO: 추가 기능 구현
}

export default Lotto;
