import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

const LOTTO_PRICE = 1000;
const LOTTO_NUMBER_COUNT = 6;
const LOTTO_MIN_NUMBER = 1;
const LOTTO_MAX_NUMBER = 45;

class LottoMachine {
  generateLotto() {
    const numbers = MissionUtils.Random.pickUniqueNumbersInRange(
      LOTTO_MIN_NUMBER,
      LOTTO_MAX_NUMBER,
      LOTTO_NUMBER_COUNT
    );
    return new Lotto(numbers);
  }

  generateLottos(purchaseAmount) {
    const lottoCount = this.calculateLottoCount(purchaseAmount);
    const lottos = [];

    for (let i = 0; i < lottoCount; i++) {
      lottos.push(this.generateLotto());
    }

    return lottos;
  }

  calculateLottoCount(purchaseAmount) {
    return purchaseAmount / LOTTO_PRICE;
  }

  getLottoPrice() {
    return LOTTO_PRICE;
  }
}

export default LottoMachine;
