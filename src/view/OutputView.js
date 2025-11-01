import { Console } from "@woowacourse/mission-utils";
import { OUTPUT_MESSAGE, NEWLINE } from "../constants/message.js";


export default class OutputView {
    #prompt(message) {
        const output = Console.print(message);
        return output;
    }

    printLottoCount(countNumber) {
        return this.#prompt(NEWLINE + countNumber + OUTPUT_MESSAGE.LOTTO_COUNT);
    }

    printLottoNumbers(lottoNumbers){
        return this.#prompt(lottoNumbers);
    }
}
