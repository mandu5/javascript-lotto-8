import Lotto from "./Lotto.js";

const LOTTO_NUMBER_COUNT = 6;
const LOTTO_MIN_NUMBER = 1;
const LOTTO_MAX_NUMBER = 45;

class WinningLotto {
  #lotto;
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    this.#validateBonusNumber(bonusNumber, numbers);
    this.#lotto = new Lotto(numbers);
    this.#bonusNumber = bonusNumber;
  }

  #validateBonusNumber(bonusNumber, numbers) {
    if (bonusNumber < LOTTO_MIN_NUMBER || bonusNumber > LOTTO_MAX_NUMBER) {
      throw new Error("[ERROR] 보너스 번호는 1부터 45 사이의 숫자여야 합니다.");
    }
    if (numbers.includes(bonusNumber)) {
      throw new Error("[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.");
    }
  }

  getWinningNumbers() {
    return this.#lotto.getNumbers();
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }

  calculateRank(lotto) {
    const matchCount = lotto.getMatchCount(this.getWinningNumbers());
    const hasBonus = lotto.hasBonusNumber(this.#bonusNumber);

    if (matchCount === 6) return 1;
    if (matchCount === 5 && hasBonus) return 2;
    if (matchCount === 5) return 3;
    if (matchCount === 4) return 4;
    if (matchCount === 3) return 5;
    return 0;
  }
}

export default WinningLotto;
