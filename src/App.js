import { InputView } from "./view/inputView.js";

const inputView = new InputView();

class App {
  async run() {
    const money = await inputView.getPurchaseAmount();
    const winningNumbers = await inputView.getWinningNumbers();
    const bonus = await inputView.getBonusNumber();
  }
}

export default App;
