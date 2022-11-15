const MissionUtils = require("@woowacourse/mission-utils");
const Console = MissionUtils.Console;
const Random = MissionUtils.Random;
const Lotto = require("./Lotto");

class App {
  constructor() {
    this.lottos=[];
    this.bonus=0;
    this.result = {
      lotto : 0,
      bonus : false,
    }
    this.result2 = {
      3: 0,
      4: 0,
      5: 0,
      '5bonus': 0,
      6: 0,
    }
    this.winLotto=0;
    this.lottoCount=0;
  }

  // statistics(){
  // }

  PrintLotto(){
    Console.print(`3개 일치 (5,000원) - ${this.result2[3]}개`);
    Console.print(`4개 일치 (50,000원) - ${this.result2[4]}개`);
    Console.print(`5개 일치 (1,500,000원) - ${this.result2[5]}개`);
    Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${this.result2['5bonus']}개`);
    Console.print(`6개 일치 (2,000,000,000원) - ${this.result2[6]}개`);
  }

  statistics(){ // 두개 비교
    // console.log(`통계: ${this.winLotto.getNumbers().includes(this.lottos)}`);

    for(const lottoNum of this.lottos){
      // 여러개의 사용자 로또 번호 중 하나의 로또에서 당첨 로또 번호 있는지 비교

      lottoNum.setLottoResult(this.winLotto.getNumbers());
      lottoNum.setBonusResult(this.bonus);
      const winningCount = lottoNum.getResult();

      if(winningCount.lotto === 5 && winningCount.bonus == true){
        this.result2['5bonus']++;
      } else if(winningCount.lotto >= 3){
        this.result2[winningCount.lotto]++;
      }
      console.log(this.result2);
      console.log(`==============================`);

    }
  }

  InputWinLotto(){
    Console.readLine('당첨 번호를 입력해 주세요.', (answer)=>{
      const splitNum = answer.split(',').map((num)=>+num);
      this.winLotto = new Lotto(splitNum);
      Console.readLine('보너스 번호를 입력해 주세요.', (answer)=>{
        this.bonus=answer;
        console.log(`당첨번호 : ${this.winLotto.getNumbers()}, bonus : ${this.bonus}`);
      })
    })
    Console.close();
  }

  PrintUserLottoNum(){
    for(const lotto of this.lottos){
      // Console.print(lotto.getNumbers());
      Console.print(lotto.print());
    }

  }

  CreateLottoNum(){
    return Random.pickUniqueNumbersInRange(1, 45, 6);
  }
  
  CreateUserLottoNum(){
    for(let idx=0; idx<this.lottoCount; idx++){
      const lottoNum = this.CreateLottoNum();
      // console.log(lottoNum);

      const lotto = new Lotto(lottoNum);
      this.lottos.push(lotto);
      // console.log(lotto.getNumbers());
    }
  }

  isValidCacheInput(answer){
    const lottotemp = answer/1000;
    if(!Number.isInteger(lottotemp)) {
      throw new Error("[ERROR] 이상한 입력");
    }
    return lottotemp;
  }


  InputCache(){
    Console.readLine('구입금액을 입력해 주세요.', (answer)=>{
      // 맞는지 확인하는 함수
      this.lottoCount = this.isValidCacheInput(answer);
      Console.print(`${this.lottoCount}개를 구매했습니다.`);
    })
    Console.close();
  }



  play() {
    // 금액 입력
    this.InputCache();
      // 금액에 맞는 로또 수량 발행
      // 해당 갯수에 맞는 로또 번호 생성
    this.CreateUserLottoNum();
    // 사용자 로또 번호 출력
    this.PrintUserLottoNum();
    // 당첨번호 입력
    this.InputWinLotto();
    // 보너스 번호 입력
    //InputBonusLotto();
      // 당첨번호와 사용자 번호 비교
     // CheckWin();

    // 통계
    this.statistics();

    // 당첨내역 출력
    this.PrintLotto();
  }
}

module.exports = App;
