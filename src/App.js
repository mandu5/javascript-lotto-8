import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import LottoMachine from "./LottoMachine.js";
import WinningLotto from "./WinningLotto.js";
import LottoResult from "./LottoResult.js";

class App {
  async run() {
    const machine = new LottoMachine();

    const purchaseAmount = await InputView.readPurchaseAmount();
    const lottos = machine.generateLottos(purchaseAmount);

    OutputView.printPurchased(lottos.length);
    OutputView.printLottos(lottos);

    const winningNumbers = await InputView.readWinningNumbers();
    const bonusNumber = await InputView.readBonusNumber(winningNumbers);

    const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
    const result = new LottoResult(lottos, winningLotto, purchaseAmount);

    OutputView.printStatistics(result.getResultLines(), result.getProfitRate());
  }
}

export default App;
