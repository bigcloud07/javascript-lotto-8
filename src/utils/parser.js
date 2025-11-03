import { validateEmptyValue, validateIsNumber, validateNoEmptyBetweenCommas, validateNoSpace, validateOnlyCommaDelimiter, validateOutofRange, validatePurchaseAmountRules, validateRangeBonusNumber, validateStartsWithNumber, validateUniqueLottoNumbers, validateWinningNumberCount } from "./validator.js";

export function purchaseAmountParser(purchaseAmount) {
    const parsedPurchaseAmount = purchaseAmount.trim();
    validateEmptyValue(parsedPurchaseAmount);
    validateNoSpace(parsedPurchaseAmount);
    validateIsNumber(parsedPurchaseAmount);
    validatePurchaseAmountRules(parsedPurchaseAmount);
    return parsedPurchaseAmount;
}

export function winningNumberParser(winningNumbers) {
    const trimmedWinningMessage = winningNumbers.trim();
    validateEmptyValue(trimmedWinningMessage);
    validateStartsWithNumber(trimmedWinningMessage);
    validateOnlyCommaDelimiter(trimmedWinningMessage);
    validateNoEmptyBetweenCommas(trimmedWinningMessage);

    const parsedwinningNumbers = trimmedWinningMessage.split(',').map(num => Number(num));
    validateWinningNumberCount(parsedwinningNumbers);
    validateUniqueLottoNumbers(parsedwinningNumbers);
    validateOutofRange(parsedwinningNumbers);
    return parsedwinningNumbers;
}

export function bonusNumberParser(bonusNumber) {
    const trimmedBonusNumber = bonusNumber.trim();
    validateEmptyValue(trimmedBonusNumber);
    validateNoSpace(trimmedBonusNumber);
    const parsedBonusNumber = Number(trimmedBonusNumber);
    validateRangeBonusNumber(parsedBonusNumber);
    return parsedBonusNumber;
}

export function lottoNumbersParser(lottos) {
    const parsedLottoNumber = lottos.map(
        (numbers) => `[${numbers.join(', ')}]`
    ).join('\n');
    return parsedLottoNumber;
}