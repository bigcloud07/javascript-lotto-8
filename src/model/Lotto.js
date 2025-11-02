import { Random } from "@woowacourse/mission-utils";
import { LOTTO_CONFIG } from "../constants/config.js";
import { lottoNumbersParser } from "../utils/parser.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }

  static generateLottoNumbers() {
    const numbers = Random.pickUniqueNumbersInRange(LOTTO_CONFIG.MIN_NUM, LOTTO_CONFIG.MAX_NUM, LOTTO_CONFIG.NUM_COUNT);
    numbers.sort((numA, numB) => numA - numB);
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