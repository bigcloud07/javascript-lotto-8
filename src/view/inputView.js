import { Console } from "@woowacourse/mission-utils";
import { INPUT_MESSAGES, NEWLINE } from "../constants/message.js";

export default class InputView {
    async prompt(message) {
        const input = await Console.readLineAsync(message + NEWLINE);
        return input;
    }

    async getPurchaseAmount() {
        return await this.prompt(INPUT_MESSAGES.MONEY_INPUT);
    }

    async getWinningNumbers() {
        return await this.prompt(NEWLINE + INPUT_MESSAGES.WINNING_NUMBERS_INPUT);
    }

    async getBonusNumber() {
        return await this.prompt(NEWLINE + INPUT_MESSAGES.BONUS_NUMBER_INPUT);
    }
}

