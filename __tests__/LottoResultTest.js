import { LottoResult } from "../src/model/LottoResult.js";

describe("LottoResult 클래스 테스트", () => {
  test("초기화 시 count값이 모두 0으로 설정된다.", () => {
    const lottoResult = new LottoResult();
    const stats = lottoResult["#statistics"];
    const result = lottoResult.generateWinningMessage();
    expect(result).toContain("0개");
  });

  test("로또 번호와 당첨 번호를 비교하여 당첨 통계를 업데이트한다.", () => {
    const lottoResult = new LottoResult();
    const lottos = [
      [1, 2, 3, 4, 5, 6], 
      [1, 2, 3, 4, 5, 7], 
      [1, 2, 3, 4, 8, 9], 
      [1, 2, 3, 10, 11, 12], 
      [1, 2, 13, 14, 15, 16], 
    ];
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    lottoResult.updateStatistics(lottos, winningNumbers, bonusNumber);

    const resultMessage = lottoResult.generateWinningMessage();

    expect(resultMessage).toContain("3개 일치");
    expect(resultMessage).toContain("4개 일치");
    expect(resultMessage).toContain("5개 일치, 보너스 볼 일치");
    expect(resultMessage).toContain("6개 일치");
  });

  test("당첨 결과를 지정된 출력 형식으로 반환한다.", () => {
    const lottoResult = new LottoResult();
    const lottos = [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 7],
    ];
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    lottoResult.updateStatistics(lottos, winningNumbers, bonusNumber);
    const message = lottoResult.generateWinningMessage();

    expect(message).toMatch(/당첨 통계/);
    expect(message).toMatch(/3개 일치/);
    expect(message).toMatch(/6개 일치/);
  });

  test("총 상금과 구매 금액을 기준으로 수익률을 계산한다.", () => {
    const lottoResult = new LottoResult();
    const lottos = [
      [1, 2, 3, 4, 5, 6], 
      [1, 2, 3, 4, 5, 7], 
    ];
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    lottoResult.updateStatistics(lottos, winningNumbers, bonusNumber);

    const message = lottoResult.generateProfitRateMessage(1000 * 2);
    expect(message).toMatch(/총 수익률은/);
    expect(message).toMatch(/%입니다/);
  });

  test("#calculateProfitRate 내부 계산 결과가 올바르게 반영된다.", () => {
    const lottoResult = new LottoResult();
    const lottos = [
      [1, 2, 3, 4, 5, 6], 
      [1, 2, 3, 4, 5, 7], 
    ];
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    lottoResult.updateStatistics(lottos, winningNumbers, bonusNumber);
    const profitMsg = lottoResult.generateProfitRateMessage(2000);
    const match = profitMsg.match(/(\d+\.\d+)/);
    const rate = parseFloat(match[1]);

    expect(rate).toBeGreaterThan(0);
  });
});