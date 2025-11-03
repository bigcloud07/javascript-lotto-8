import { Console } from "@woowacourse/mission-utils";
import { OUTPUT_MESSAGES, NEWLINE } from "../constants/message.js";


export default class OutputView {
    prompt(message) {
        const output = Console.print(message);
        return output;
    }

    printLottoCount(countNumber) {
        return this.prompt(NEWLINE + countNumber + OUTPUT_MESSAGES.LOTTO_COUNT_SUFFIX);
    }

    printLottoNumbers(lottoNumbers) {
        return this.prompt(lottoNumbers);
    }

    printMessage(message){
        return this.prompt(message);
    }
}
