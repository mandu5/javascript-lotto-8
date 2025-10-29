const PRIZE_MONEY = {
  1: 2000000000,
  2: 30000000,
  3: 1500000,
  4: 50000,
  5: 5000,
};

const PRIZE_NAMES = {
  1: "6개 일치 (2,000,000,000원)",
  2: "5개 일치, 보너스 볼 일치 (30,000,000원)",
  3: "5개 일치 (1,500,000원)",
  4: "4개 일치 (50,000원)",
  5: "3개 일치 (5,000원)",
};

class LottoResult {
  #rankCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  #totalPurchaseAmount = 0;

  constructor(lottos, winningLotto, purchaseAmount) {
    this.#totalPurchaseAmount = purchaseAmount;
    this.#calculateResults(lottos, winningLotto);
  }

  #calculateResults(lottos, winningLotto) {
    lottos.forEach((lotto) => {
      const rank = winningLotto.calculateRank(lotto);
      if (rank > 0) {
        this.#rankCounts[rank]++;
      }
    });
  }

  getRankCounts() {
    return { ...this.#rankCounts };
  }

  getTotalPrizeMoney() {
    let total = 0;
    Object.keys(this.#rankCounts).forEach((rank) => {
      total += this.#rankCounts[rank] * PRIZE_MONEY[rank];
    });
    return total;
  }

  getProfitRate() {
    const totalPrizeMoney = this.getTotalPrizeMoney();
    const profitRate = (totalPrizeMoney / this.#totalPurchaseAmount) * 100;
    return Math.round(profitRate * 10) / 10;
  }

  getResultLines() {
    const lines = [];
    for (let rank = 5; rank >= 1; rank--) {
      const count = this.#rankCounts[rank];
      lines.push(`${PRIZE_NAMES[rank]} - ${count}개`);
    }
    return lines;
  }
}

export default LottoResult;
