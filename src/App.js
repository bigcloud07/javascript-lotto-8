import Lotto from "./model/Lotto.js";
import { LottoResult } from "./model/LottoResult.js";
import { bonusNumberParser, lottoNumbersParser, purchaseAmountParser, winningNumberParser } from "./utils/parser.js";
import InputView from "./view/InputView.js";
import OutputView from "./view/OutputView.js";
import { inputErrorHandler } from "./utils/errorHandler.js";
import { validateBonusNumberDuplicate } from "./utils/validator.js";

class App {
  async run() {
    const inputView = new InputView();
    const outputView = new OutputView()
    const lottoResult = new LottoResult();

    const purchaseAmount = await inputErrorHandler(async () => {
      const inputPurchaseAmount = await inputView.getPurchaseAmount();
      const parsedPurchaseAmount = purchaseAmountParser(inputPurchaseAmount);
      return parsedPurchaseAmount;
    }, outputView);

    const lottoCount = purchaseAmount / 1000;

    outputView.printLottoCount(lottoCount);

    const issuedLottos = Lotto.generateMultipleLottos(lottoCount);
    const parsedLottos = lottoNumbersParser(issuedLottos);
    outputView.printLottoNumbers(parsedLottos);

    const winningNumbers = await inputErrorHandler(async () => {
      const inputWinningNumbers = await inputView.getWinningNumbers();
      const parsedWinningNumbers = winningNumberParser(inputWinningNumbers);
      return parsedWinningNumbers;
    }, outputView);

    const bonusNumber = await inputErrorHandler(async () => {
      const inputBonusNumber = await inputView.getBonusNumber();
      const parsedBonusNumber = bonusNumberParser(inputBonusNumber);
      validateBonusNumberDuplicate(winningNumbers, parsedBonusNumber);
      return parsedBonusNumber;
    }, outputView);
    

    lottoResult.updateStatistics(issuedLottos, winningNumbers, bonusNumber);

    const winningMessage = lottoResult.generateWinningMessage();
    const profitRateMessage = lottoResult.generateProfitRateMessage(purchaseAmount);

    outputView.printMessage(winningMessage);
    outputView.printMessage(profitRateMessage);
  }
}

export default App;
