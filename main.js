function onSubmit(event) {
  event.preventDefault();
  const w = parseFloat(event.target[0].value);
  const h = parseFloat(event.target[1].value);
  //신장이 m 단위이므로 소수점을 포함해야 하기 때문에 parseFloat() 사용

  if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
    //w나 h 값 중 하나라도 숫자가 아닌 경우나 빈 값일 경우
    //또한 w나 h 값이 숫자이나 0 이하일 경우
    //이렇게 해주면 사용자가 html을 수정하더라도 숫자가 아닌 값을 입력하는 것을 막을 수 있음
    alert("적절한 값이 아닙니다.");
    return;
  }

  const bmi = w / (h * h);

  const res = document.getElementById("res");
  res.style.display = "flex";

  document.getElementById("bmi").innerText = bmi.toFixed(2);
  document.getElementById("meter").value = bmi;

  let state = "정상";
  let common = true;
  if (bmi < 18.5) {
    state = "저체중";
    common = false;
  }
  if (bmi >= 25) {
    state = "과체중";
    common = false;
  }
  const stateEl = document.getElementById("state");
  stateEl.innerText = state;
  stateEl.style.color = common ? "green" : "red";
}

function onReset() {
  const res = document.getElementById("res");
  res.style.display = "none";
}
