import { LOTTO_CONFIG } from "../constants/config.js";
import { ERROR_MESSAGES } from "../constants/message.js";


export function validateEmptyValue(stringInput) {
    if (stringInput.length === 0) {
        throw new Error(ERROR_MESSAGES.EMPTY_VALUE);
    }
}

export function validateIsNumber(number) {
  const parsedNum = Number(number);
  const isNumber = Number.isNaN(parsedNum);
  if (isNumber) {
    throw new Error(ERROR_MESSAGES.IS_NOT_NUMBER);
  }
}

export function validateNoSpace(input) {
    if (input.includes(' ')) {
        throw new Error(ERROR_MESSAGES.NO_SPACE);
    }
};

export function validateOnlyCommaDelimiter(input) {
  if (/[^0-9,\s]/.test(input)) {
    throw new Error(ERROR_MESSAGES.ONLY_COMMA_DELIMITER);
  }
}

export function validatePurchaseAmountRules(number) {
    if (number < 1000) {
        throw new Error(ERROR_MESSAGES.MINIMUM_PURCHASE);
    }
    if (number % 1000 !== 0) {
        throw new Error(ERROR_MESSAGES.UNIT_PURCHASE);
    }
}

export function validateNoEmptyBetweenCommas(input) {
  if (/(,\s*,)/.test(input)) {
    throw new Error(ERROR_MESSAGES.EMPTY_BETWEEN_COMMAS);
  }
}

export function validateWinningNumberCount(numbers) {
    if (numbers.length !== LOTTO_CONFIG.NUM_COUNT) {
        throw new Error(ERROR_MESSAGES.LOTTO_COUNT);
    }
}

export function validateStartsWithNumber(input) {
  if (!/^\d/.test(input)) {
    throw new Error(ERROR_MESSAGES.NOT_START_WITH_NUMBER);
  }
}

export function validateUniqueLottoNumbers(numbers) {
    const uniqueLottoNumbers = new Set(numbers);
    if (uniqueLottoNumbers.size !== LOTTO_CONFIG.NUM_COUNT) {
        throw new Error(ERROR_MESSAGES.DUPLICATE_NUMBER);
    }
}

export function validateOutofRange(numbers) {
    const isOutOfRange = numbers.some((num) => num < LOTTO_CONFIG.MIN_NUM || num > LOTTO_CONFIG.MAX_NUM);
    if (isOutOfRange) {
        throw new Error(ERROR_MESSAGES.NUMBER_OUT_OF_RANGE);
    }
}

export function validateRangeBonusNumber(number) {
  if (!Number.isInteger(number) || number < LOTTO_CONFIG.MIN_NUM || number > LOTTO_CONFIG.MAX_NUM) {
    throw new Error(ERROR_MESSAGES.BONUS_NUMBER_INVALID);
  }
}

export function validateBonusNumberDuplicate(winningNumnbers, bonusNumber){
    if (winningNumnbers.includes(bonusNumber)) {
    throw new Error(ERROR_MESSAGES.BONUS_DUPLICATE);
  }
}


