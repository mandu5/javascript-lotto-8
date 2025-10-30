import { MissionUtils } from "@woowacourse/mission-utils";

const LOTTO_PRICE = 1000;
const LOTTO_MIN_NUMBER = 1;
const LOTTO_MAX_NUMBER = 45;
const LOTTO_NUMBER_COUNT = 6;

class InputView {
  static async readPurchaseAmount() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        const input = await MissionUtils.Console.readLineAsync(
          "구입금액을 입력해 주세요."
        );
        const amount = Number(input);
        if (
          !Number.isInteger(amount) ||
          amount < LOTTO_PRICE ||
          amount % LOTTO_PRICE !== 0
        ) {
          throw new Error(
            "[ERROR] 구입 금액은 1,000원 단위의 정수여야 합니다."
          );
        }
        return amount;
      } catch (error) {
        MissionUtils.Console.print(error.message);
      }
    }
  }

  static async readWinningNumbers() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        const input = await MissionUtils.Console.readLineAsync(
          "당첨 번호를 입력해 주세요."
        );
        const numbers = input
          .split(",")
          .map((s) => s.trim())
          .map((s) => Number(s));

        this.#validateNumbers(numbers);
        return numbers;
      } catch (error) {
        MissionUtils.Console.print(error.message);
      }
    }
  }

  static async readBonusNumber(winningNumbers) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        const input = await MissionUtils.Console.readLineAsync(
          "보너스 번호를 입력해 주세요."
        );
        const bonus = Number(input);
        if (
          !Number.isInteger(bonus) ||
          bonus < LOTTO_MIN_NUMBER ||
          bonus > LOTTO_MAX_NUMBER
        ) {
          throw new Error(
            "[ERROR] 보너스 번호는 1부터 45 사이의 정수여야 합니다."
          );
        }
        if (winningNumbers.includes(bonus)) {
          throw new Error(
            "[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다."
          );
        }
        return bonus;
      } catch (error) {
        MissionUtils.Console.print(error.message);
      }
    }
  }

  static #validateNumbers(numbers) {
    if (numbers.length !== LOTTO_NUMBER_COUNT) {
      throw new Error("[ERROR] 당첨 번호는 6개여야 합니다.");
    }
    numbers.forEach((n) => {
      if (
        !Number.isInteger(n) ||
        n < LOTTO_MIN_NUMBER ||
        n > LOTTO_MAX_NUMBER
      ) {
        throw new Error("[ERROR] 로또 번호는 1부터 45 사이의 정수여야 합니다.");
      }
    });
    const unique = new Set(numbers);
    if (unique.size !== numbers.length) {
      throw new Error("[ERROR] 당첨 번호에 중복된 숫자가 있습니다.");
    }
  }
}

export default InputView;
