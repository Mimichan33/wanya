const answer = Math.floor(Math.random() * 100) + 1;
let count = 0;
const max = 5;
const chat = document.getElementById("chat");

function addMessage(text) {
  const p = document.createElement("p");
  p.textContent = "ワドルディ： " + text;
  chat.appendChild(p);
}

addMessage("1〜100の数字を考えたよ！");

function check() {
  const val = Number(document.getElementById("guess").value);
  if (!val) return;

  count++;

  if (val === answer) {
    localStorage.setItem("passcode", "2525");
    addMessage("おめでとう！暗証番号は【2525】だよ！");
  } else if (count >= max) {
    addMessage("ざんねん…もう一度遊んでね");
  } else if (val < answer) {
    addMessage("もっと大きいよ！");
  } else {
    addMessage("もっと小さいよ！");
  }
}
