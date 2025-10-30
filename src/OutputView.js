import { MissionUtils } from "@woowacourse/mission-utils";

class OutputView {
  static printPurchased(count) {
    MissionUtils.Console.print(`${count}개를 구매했습니다.`);
  }

  static printLottos(lottos) {
    lottos.forEach((lotto) => {
      const nums = [...lotto.getNumbers()].sort((a, b) => a - b);
      MissionUtils.Console.print(`[${nums.join(", ")}]`);
    });
  }

  static printStatistics(lines, profitRate) {
    MissionUtils.Console.print("\n당첨 통계");
    MissionUtils.Console.print("---");
    lines.forEach((line) => MissionUtils.Console.print(line));
    MissionUtils.Console.print(`총 수익률은 ${profitRate}%입니다.`);
  }
}

export default OutputView;
