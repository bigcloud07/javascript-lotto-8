import { Random } from "@woowacourse/mission-utils";
import { LOTTO_CONFIG } from "../constants/config.js";
import { ERROR_MESSAGES } from "../constants/message.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== LOTTO_CONFIG.NUM_COUNT) {
      throw new Error(ERROR_MESSAGES.LOTTO_COUNT);
    }

    const uniqueLottoNumbers = new Set(numbers);
    if (uniqueLottoNumbers.size !== LOTTO_CONFIG.NUM_COUNT) {
      throw new Error(ERROR_MESSAGES.DUPLICATE_NUMBER);
    }

    const isOutOfRange = numbers.some((num) => num < LOTTO_CONFIG.MIN_NUM || num > LOTTO_CONFIG.MAX_NUM);
    if (isOutOfRange) {
      throw new Error(ERROR_MESSAGES.NUMBER_OUT_OF_RANGE);
    }
  }

  static generateLottoNumbers() {
    const numbers = Random.pickUniqueNumbersInRange(LOTTO_CONFIG.MIN_NUM, LOTTO_CONFIG.MAX_NUM, LOTTO_CONFIG.NUM_COUNT);
    numbers.sort((numA, numB) => numA - numB);

    new Lotto(numbers);
    return numbers;
  }

  static generateMultipleLottos(lottoCount) {
    const lottoTickets = [];

    for (let repetitions = 0; repetitions < lottoCount; repetitions++) {
      const lottoTicket = this.generateLottoNumbers();
      lottoTickets.push(lottoTicket);
    }

    return lottoTickets;
  }
}

export default Lotto;