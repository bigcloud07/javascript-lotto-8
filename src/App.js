import Lotto from "./model/Lotto.js";
import InputView from "./view/InputView.js";
import OutputView from "./view/OutputView.js";

class App {
  async run() {
    const inputView = new InputView();
    const outputView = new OutputView()
    
    const money = await inputView.getPurchaseAmount();
    const lottoCount = money / 1000;

    outputView.printLottoCount(lottoCount);

    for(let _ = 0 ; _ < lottoCount ; _++){
      const lottoNumbers = Lotto.generateLottoNumbers();
      outputView.printLottoNumbers(lottoNumbers);
    }

    const winningNumbers = await inputView.getWinningNumbers();
    const lotto = new Lotto(winningNumbers);

    const bonusNumber = await inputView.getBonusNumber();

    

    

    // const lotto = new Lotto(winningNumbers);
  }
}

export default App;
