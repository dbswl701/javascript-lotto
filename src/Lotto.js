class Lotto {
  #numbers;

  constructor(numbers) {
    this.validate(numbers);
    this.#numbers = numbers;
    this.result = {
      lotto: 0,
      bonus: false,
    };
  }

  validate(numbers) {
    // console.log(`lotto's length : ${numbers.length}`);
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
    // 중복 있는지 검사
    const set = new Set(numbers);
    // console.log(`lotto size : ${numbers.length}, set size : ${set.size}`);

    if(numbers.length !== set.size) {
      throw new Error("[ERROR] 로또 번호는 중복이 불가능합니다.");
    }
  }

  getNumbers(){
    return this.#numbers;
  }

  print(){
    return `[${this.#numbers.join(', ')}]`;
  }

  setLottoResult(winningNum){
    for(const num of this.#numbers){
      console.log(winningNum ,num, this.#numbers);
      if(winningNum.includes(num)) {
        this.result.lotto++;
        console.log(`숫자 당첨!! ${num}`);
      }
    }
  }
  
  setBonusResult(bonusNum){
    if(this.#numbers.includes(bonusNum)) this.result.bonus=true;
  }

  getResult(){
    return this.result;
  }
  // TODO: 추가 기능 구현
}

module.exports = Lotto;
