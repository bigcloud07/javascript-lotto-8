import { LOTTO_RESULT_CONFIG, LOTTO_REWARDS } from "../constants/config.js";
import { NEWLINE, OUTPUT_MESSAGES } from "../constants/message.js";

export class LottoResult {
    #statistics

    constructor() {
        this.#statistics = {
            3: { count: 0, reward: LOTTO_REWARDS[3] },
            4: { count: 0, reward: LOTTO_REWARDS[4] },
            5: { count: 0, reward: LOTTO_REWARDS[5] },
            '5B': { count: 0, reward: LOTTO_REWARDS['5B'] },
            6: { count: 0, reward: LOTTO_REWARDS[6] },
        };
    }

    checkWinningNumbers(lottos, winningNumbers, bonusNumber) {
        return lottos.map((lotto) => {
            const matchCount = lotto.filter((num) => winningNumbers.includes(num)).length;
            const hasBonus = lotto.includes(bonusNumber);
            return { matchCount, hasBonus };
        });
    };

    applyResult(matchCount, hasBonus) {
        if (matchCount === 6) {
            this.#statistics[6].count += 1;
            return;
        }
        if (matchCount === 5 && hasBonus) {
            this.#statistics['5B'].count += 1;
            return;
        }
        const stat = this.#statistics[matchCount];
        if (stat) stat.count += 1;
    };

    updateStatistics(lottos, winningNumbers, bonusNumber) {
        const checkedResults = this.checkWinningNumbers(lottos, winningNumbers, bonusNumber);

        checkedResults.forEach(({ matchCount, hasBonus }) =>
            this.applyResult(matchCount, hasBonus)
        );
    };

    generateWinningMessage() {
        const order = [3, 4, 5, '5B', 6];
        const winningPromptLines = [];

        winningPromptLines.push(OUTPUT_MESSAGES.STAT_HEADER, OUTPUT_MESSAGES.STAT_SEPARATOR);

        order.forEach((key) => {
            const label = OUTPUT_MESSAGES.WINNING_LABELS[key];
            const { count } = this.#statistics[key];
            const line = `${label}${count}${OUTPUT_MESSAGES.UNIT.COUNT}`;
            winningPromptLines.push(line);
        });

        return winningPromptLines.join(NEWLINE);
    };

    calculateProfitRate(purchaseAmount) {
        const totalReward = Object.values(this.#statistics).reduce(
            (sum, { count, reward }) => sum + count * reward, LOTTO_RESULT_CONFIG.INITIAL_VALUE
        );

        const profitRate = (totalReward / purchaseAmount) * LOTTO_RESULT_CONFIG.PERCENTAGE_MULTIPLIER;
        return profitRate.toFixed(1);
    };

    generateProfitRateMessage(purchaseAmount) {
        const profitRate = this.calculateProfitRate(purchaseAmount);
        const profitRateMessage = `${OUTPUT_MESSAGES.PROFIT_PREFIX}${profitRate}${OUTPUT_MESSAGES.PROFIT_SUFFIX}`;

        return profitRateMessage;
    };
}

