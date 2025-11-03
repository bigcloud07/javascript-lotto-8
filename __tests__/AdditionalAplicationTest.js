import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { ERROR_MESSAGES } from "../src/constants/message.js";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickUniqueNumbersInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

const runException = async ({
  input,
  winningNumbers = "1,2,3,4,5,6",
  bonusNumber = "7",
  expectedError,
}) => {
  const logSpy = getLogSpy();

  mockRandoms([[1, 2, 3, 4, 5, 6]]);

  // 구입 금액, 당첨 번호, 보너스 번호 등 중간에서 에러 발생시 재입력을 요구할 때를 처리하기 위한 배열 값.
  const RECOVERY_INPUTS = ["1000", "1,2,3,4,5,6", "7"];  

  mockQuestions([input, winningNumbers, bonusNumber, ...RECOVERY_INPUTS]);

  const app = new App();
  await app.run();

  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expectedError));
};

describe("로또 테스트", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("기능 테스트", async () => {
    // given
    const logSpy = getLogSpy();

    mockRandoms([
      [8, 21, 23, 41, 42, 43],
      [3, 5, 11, 16, 32, 38],
      [7, 11, 16, 35, 36, 44],
      [1, 8, 11, 31, 41, 42],
      [13, 14, 16, 38, 42, 45],
      [7, 11, 30, 40, 42, 43],
      [2, 13, 22, 32, 38, 45],
      [1, 3, 5, 14, 22, 45],
    ]);
    mockQuestions(["8000", "1,2,3,4,5,6", "7"]);

    // when
    const app = new App();
    await app.run();

    // then
    const logs = [
      "8개를 구매했습니다.",
      "[8, 21, 23, 41, 42, 43]",
      "[3, 5, 11, 16, 32, 38]",
      "[7, 11, 16, 35, 36, 44]",
      "[1, 8, 11, 31, 41, 42]",
      "[13, 14, 16, 38, 42, 45]",
      "[7, 11, 30, 40, 42, 43]",
      "[2, 13, 22, 32, 38, 45]",
      "[1, 3, 5, 14, 22, 45]",
      "3개 일치 (5,000원) - 1개",
      "4개 일치 (50,000원) - 0개",
      "5개 일치 (1,500,000원) - 0개",
      "5개 일치, 보너스 볼 일치 (30,000,000원) - 0개",
      "6개 일치 (2,000,000,000원) - 0개",
      "총 수익률은 62.5%입니다.",
    ];

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  describe("예외 테스트", () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    test.each([
      {
        input: "",
        description: "구입 값을 입력하지 않은 경우",
        expectedError: ERROR_MESSAGES.EMPTY_VALUE,
      },
      {
        input: "100dd",
        description: "구입 값에 숫자가 아닌 문자열이 포함 된 경우",
        expectedError: ERROR_MESSAGES.IS_NOT_NUMBER,
      },
      {
        input: "1000",
        description: "당첨 번호 값을 입력하지 않은 경우",
        winningNumbers: '',
        expectedError: ERROR_MESSAGES.EMPTY_VALUE,
      },
      {
        input: "1000",
        description: "보너스 숫자를 입력하지 않은 경우",
        winningNumbers: '1,2,3,4,5,6',
        bonusNumber: '',
        expectedError: ERROR_MESSAGES.EMPTY_VALUE,
      },
      {
        input: "10 00",
        description: "구매 입력값에 공백이 포함된 경우",
        expectedError: ERROR_MESSAGES.NO_SPACE,
      },
      {
        input: "3330",
        description: "구입 금액이 1000 단위가 아닌 경우",
        expectedError: ERROR_MESSAGES.UNIT_PURCHASE,
      },
      {
        input: "300",
        description: "구입 금액이 1000원 보다 작은 경우",
        expectedError: ERROR_MESSAGES.MINIMUM_PURCHASE,
      },
      {
        input: "1000",
        description: "당첨 번호를 숫자로 시작하지 않은 경우",
        winningNumbers: ",3,3",
        expectedError: ERROR_MESSAGES.NOT_START_WITH_NUMBER,
      },
      {
        input: "1000",
        description: "당첨 번호를 쉼표로 구분하지 않은 경우",
        winningNumbers: "3.3.3",
        expectedError: ERROR_MESSAGES.ONLY_COMMA_DELIMITER,
      },
      {
        input: "1000",
        description: "당첨 번호 숫자가 6개 이하인 경우",
        winningNumbers: "1,2,3,4,5",
        expectedError: ERROR_MESSAGES.LOTTO_COUNT,
      },
      {
        input: "1000",
        description: "당첨 번호에 중복된 숫자가 있을 경우",
        winningNumbers: "1,2,3,4,5,5",
        expectedError: ERROR_MESSAGES.DUPLICATE_NUMBER,
      },
      {
        input: "1000",
        description: "당첨 번호에 1 ~ 45 사이의 숫자가 없는 경우",
        winningNumbers: "1,2,3,4,5,60",
        expectedError: ERROR_MESSAGES.NUMBER_OUT_OF_RANGE,
      },
      {
        input: "1000",
        description: "보너스 숫자 사이에 공백을 입력한 경우",
        winningNumbers: "1,2,3,4,5,6",
        bonusNumber: "1 3",
        expectedError: ERROR_MESSAGES.NO_SPACE,
      },
      {
        input: "1000",
        description: "보너스 숫자에 1 ~ 45 사이의 숫자가 입력되지 않은 경우",
        winningNumbers: "1,2,3,4,5,6",
        bonusNumber: "50",
        expectedError: ERROR_MESSAGES.BONUS_NUMBER_INVALID,
      },
      {
        input: "1000",
        description: "보너스 숫자가 당첨 번호와 중복되는 경우",
        winningNumbers: "1,2,3,4,5,6",
        bonusNumber: "1",
        expectedError: ERROR_MESSAGES.BONUS_DUPLICATE,
      },
    ])(
      "예외 테스트 - $description",
      async ({ input, winningNumbers = "1,2,3,4,5,6", bonusNumber = "7", expectedError }) => {
        await runException({ input, winningNumbers, bonusNumber, expectedError });
      }
    );
  });

});
