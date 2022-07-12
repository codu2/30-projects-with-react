let left = null,
  right = null,
  oper = null,
  res = false, //=이 눌렸을 때 true
  resValue = null;

calc();

function calc() {
  const buttons = document.getElementById("buttons");
  buttons.addEventListener("click", (event) => {
    if (event.target.dataset.val) {
      inputNum(parseInt(event.target.dataset.val));
    }
    if (event.target.dataset.oper) {
      inputOper(event.target.dataset.oper);
    }
    if (event.target.dataset.equ) {
      inputEqu();
    }
  });
}

function save() {
  const inp = document.getElementById("top-inp");
  let value = "";

  if (left === null) return;
  value += left + " ";
  inp.value = value;
  if (oper === null) return;
  value += oper + " ";
  inp.value = value;
  if (right === null) return;
  value += right + " ";
  inp.value = value;

  if (res) {
    //res가 true일 때, 즉 = 버튼이 눌렸을 때
    switch (oper) {
      case "+":
        resValue = parseInt(left) + parseInt(right);
        break;
      case "-":
        resValue = parseInt(left) - parseInt(right);
        break;
      case "*":
        resValue = parseInt(left) * parseInt(right);
        break;
      case "/":
        resValue = parseInt(left) / parseInt(right);
        break;
    }
    value += "= " + resValue;
    inp.value = value;
  }
}

function inputNum(num) {
  //num이 들어왔을 때
  if (oper === null) {
    //left 입력이 끝나지 않았을 때
    if (left === null) {
      //input이 한번도 입력되지 않았을 때
      left = `${num}`; //문자열로 바꿔서 넣어주기 = num.toString()
    } else {
      if (num === 0 && parseInt(left) === 0) {
        //000과 같이 0을 연속으로 갖는 숫자는 없기 때문에 아무것도 하지 않도록 해줌
        return;
      }
      left += `${num}`; //연산자인 oper가 입력되기 전이라면 left 입력이 종료되지 않았으므로 문자열로 더해줌
    }
  } else {
    //oper이 null이 아닐 때 num이 들어왔다면 right가 입력된 것
    if (right === null) {
      right = `${num}`;
    } else {
      if (num === 0 && parseInt(right) === 0) {
        return;
      }
      right += `${num}`;
    }
  }
  save();
}

function inputOper(op) {
  if (left === null && op === "-") {
    //left가 입력되지 않았을 때 oper가 "-"이라면 left가 음수일 수 있도록 하기 위함
    left = "-";
    save();
    return;
  }
  if (left === "-" && op === "-") {
    //이미 "-"라면 oper이 "-"로 입력되어도 또 입력되지 않고 숫자를 입력하도록 함
    return;
  }
  if (op === "-" && oper !== null && right === null) {
    //oper가 존재하고 right가 존재하지 않을 때 "-"를 입력하면 right가 음수가 되도록 함
    //right가 null이 아닐 때는 right가 음수가 되는 게 아니라 oper이 -로 대체됨
    right = "-";
    save();
    return;
  }
  oper = op; //연산자를 더해주는 것이 아닌 대체되도록 함
  save();
}

function inputEqu() {
  if (left === null || right === null || !oper) return;
  //left, right, oper 값이 없을 때, left 값만 있을 때, left, oper 값만 있을 때는 res가 true가 되지 않도록 해줌

  if (res) {
    left = resValue;
    oper = null;
    right = null;
    resValue = null;
    res = false;
  } else {
    res = true;
  }
  save();
}
