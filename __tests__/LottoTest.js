import Lotto from "../src/model/Lotto";
import { ERROR_MESSAGES } from "../src/constants/message";
import { LOTTO_CONFIG } from "../src/constants/config";

describe("로또 클래스 테스트", () => {
  test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow("[ERROR]");
  });

  // TODO: 테스트가 통과하도록 프로덕션 코드 구현
  test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow("[ERROR]");
  });

  // TODO: 추가 기능 구현에 따른 테스트 코드 작성
  test("로또 번호가 1~45 범위를 벗어나면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([0, 2, 3, 4, 5, 6]);
    }).toThrow(ERROR_MESSAGES.NUMBER_OUT_OF_RANGE);

    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 46]);
    }).toThrow(ERROR_MESSAGES.NUMBER_OUT_OF_RANGE);
  });

  test("올바른 로또 번호 배열이면 예외가 발생하지 않는다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6]);
    }).not.toThrow();
  });

  test("generateLottoNumbers()는 6개의 정렬된 고유 번호를 반환한다.", () => {
    const numbers = Lotto.generateLottoNumbers();
    expect(numbers).toHaveLength(LOTTO_CONFIG.NUM_COUNT);
    expect([...new Set(numbers)]).toHaveLength(LOTTO_CONFIG.NUM_COUNT);
    expect(numbers).toEqual([...numbers].sort((a, b) => a - b));
  });

  test("generateMultipleLottos()는 지정된 개수만큼의 로또 배열을 반환한다.", () => {
    const lottoCount = 5;
    const lottoTickets = Lotto.generateMultipleLottos(lottoCount);
    expect(lottoTickets).toHaveLength(lottoCount);
    lottoTickets.forEach((ticket) => {
      expect(ticket).toHaveLength(LOTTO_CONFIG.NUM_COUNT);
    });
  });
});
