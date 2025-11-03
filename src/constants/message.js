export const INPUT_MESSAGES = Object.freeze({
    MONEY_INPUT : '구입금액을 입력해 주세요.',
    WINNING_NUMBERS_INPUT : '당첨 번호를 입력해 주세요.',
    BONUS_NUMBER_INPUT : '보너스 번호를 입력해 주세요.'
});

export const OUTPUT_MESSAGES = Object.freeze({
  LOTTO_COUNT_SUFFIX: "개를 구매했습니다.",
  STAT_HEADER: "\n당첨 통계",
  STAT_SEPARATOR: "---",
  WINNING_LABELS: {
    "3":  "3개 일치 (5,000원) - ",
    "4":  "4개 일치 (50,000원) - ",
    "5":  "5개 일치 (1,500,000원) - ",
    "5B": "5개 일치, 보너스 볼 일치 (30,000,000원) - ",
    "6":  "6개 일치 (2,000,000,000원) - ",
  },
  PROFIT_PREFIX: "총 수익률은 ",
  PROFIT_SUFFIX: "%입니다.",
  UNIT: {
    MONEY: "원",
    COUNT: "개",
  },
});

export const NEWLINE = "\n";

export const ERROR_MESSAGES = Object.freeze({
  EMPTY_VALUE: "[ERROR] 값을 입력해주세요.",
  IS_NOT_NUMBER: "[ERROR] 숫자를 입력해주세요.",
  NO_SPACE: "[ERROR] 입력 값 사이에 공백은 입력할 수 없습니다.",
  MINIMUM_PURCHASE: "[ERROR] 입력 최소 금액은 1000원입니다.",
  UNIT_PURCHASE: "[ERROR] 금액은 1000원 단위로 입력해야 합니다.",
  ONLY_COMMA_DELIMITER: "[ERROR] 쉼표(,)로만 구분해야 합니다.",
  EMPTY_BETWEEN_COMMAS: "[ERROR] 쉼표 사이에 빈 값이 있습니다.",
  NOT_START_WITH_NUMBER: "[ERROR] 숫자로 시작해야 합니다.",
  LOTTO_COUNT: "[ERROR] 로또 번호는 6개여야 합니다.",
  DUPLICATE_NUMBER: "[ERROR] 중복된 숫자가 있습니다.",
  NUMBER_OUT_OF_RANGE: "[ERROR] 로또 번호는 1부터 45 사이여야 합니다.",
  BONUS_NUMBER_INVALID: "[ERROR] 보너스 번호는 1부터 45 사이의 자연수여야 합니다.",
  BONUS_DUPLICATE: "[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다."
});