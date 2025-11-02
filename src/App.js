import Lotto from "./model/Lotto.js";
import { LottoResult } from "./model/LottoResult.js";
import { bonusNumberParser, lottoNumbersParser, winningNumberParser } from "./utils/parser.js";
import InputView from "./view/InputView.js";
import OutputView from "./view/OutputView.js";

class App {
  async run() {
    const inputView = new InputView();
    const outputView = new OutputView()
    const lottoResult = new LottoResult();

    const purchaseAmount = await inputView.getPurchaseAmount();
    const lottoCount = purchaseAmount / 1000;

    outputView.printLottoCount(lottoCount);
    
    const issuedLottos = Lotto.generateMultipleLottos(lottoCount);
    const parsedLottos = lottoNumbersParser(issuedLottos);
    outputView.printLottoNumbers(parsedLottos);
    
    const winningNumbers = await inputView.getWinningNumbers();
    const parsedWinningNumbers = winningNumberParser(winningNumbers);


    const bonusNumber = await inputView.getBonusNumber();
    const parsedBonusNumber = bonusNumberParser(bonusNumber);

    lottoResult.updateStatistics(issuedLottos, parsedWinningNumbers, parsedBonusNumber);

    const winningMessage = lottoResult.generateWinningMessage();
    const profitRateMessage = lottoResult.generateProfitRateMessage(purchaseAmount);

    outputView.printMessage(winningMessage);
    outputView.printMessage(profitRateMessage);

  }
}

export default App;
