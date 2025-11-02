import { NEWLINE, OUTPUT_MESSAGES } from "../constants/message.js";

export class LottoResult {
    #statistics

    constructor() {
        this.#statistics = {
            3: { count: 0, reward: 5000 },
            4: { count: 0, reward: 50000 },
            5: { count: 0, reward: 1500000 },
            '5B': { count: 0, reward: 30000000 },
            6: { count: 0, reward: 2000000000 },
        };
    }

    #checkWinningNumbers(lottos, winningNumbers, bonusNumber) {
        return lottos.map((lotto) => {
            const matchCount = lotto.filter((num) => winningNumbers.includes(num)).length;
            const hasBonus = lotto.includes(bonusNumber);
            return { matchCount, hasBonus };
        });
    }

    updateStatistics(lottos, winningNumbers, bonusNumber) {
        const checkedResults = this.#checkWinningNumbers(lottos, winningNumbers, bonusNumber);

        checkedResults.forEach(({ matchCount, hasBonus }) => {
            if (matchCount === 6) {
                this.#statistics[6].count += 1;
                return;
            }

            if (matchCount === 5 && hasBonus) {
                this.#statistics['5B'].count += 1;
                return;
            }

            if (this.#statistics[matchCount]) {
                this.#statistics[matchCount].count += 1;
            }
        });
    }

    generateWinningMessage() {
        const order = [3, 4, 5, '5B', 6];
        const winningPromptLines = [];

        winningPromptLines.push(OUTPUT_MESSAGES.STAT_HEADER, OUTPUT_MESSAGES.STAT_SEPARATOR);

        order.forEach((key) => {
            const label = OUTPUT_MESSAGES.LABELS[key];
            const { count } = this.#statistics[key];
            const line =
                `${label}${count}${OUTPUT_MESSAGES.UNIT.COUNT}`;
            winningPromptLines.push(line);
        });

        return winningPromptLines.join(NEWLINE);
    }

    #calculateProfitRate(purchaseAmount) {
        const totalReward = Object.values(this.#statistics).reduce(
            (sum, { count, reward }) => sum + count * reward, 0
        );

        const profitRate = (totalReward / purchaseAmount) * 100;
        return profitRate.toFixed(1);
    }

    generateProfitRateMessage(purchaseAmount){
        const profitRate = this.#calculateProfitRate(purchaseAmount);
        const profitRateMessage = `${OUTPUT_MESSAGES.PROFIT_PREFIX}${profitRate}${OUTPUT_MESSAGES.PROFIT_SUFFIX}`;

        return profitRateMessage;
    }
}

