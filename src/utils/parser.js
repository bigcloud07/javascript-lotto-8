export function winningNumberParser(numbers) {
    const winningNumbers = numbers.split(',').map(num => Number(num));
    return winningNumbers;
}

export function bonusNumberParser(bonusNumber) {
    const parsedBonusNumber = Number(bonusNumber);
    return parsedBonusNumber;
}

export function lottoNumbersParser(lottos){
    const parsedLottoNumber = lottos.map(
      (numbers) => `[${numbers.join(', ')}]`
    ).join('\n');
    return parsedLottoNumber;
}