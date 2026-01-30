let answer = Math.floor(Math.random() * 100) + 1; // 1〜100
let count = 0;
let maxCount = 5;
let gameOver = false;

const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("numberInput");
const chatArea = document.getElementById("chatArea");

/* 吹き出し追加用 */
function addWaddleDeeIcon() {
  const icon = document.createElement("div");
  icon.className = "waddledee-icon-only";
  chatArea.appendChild(icon);
  chatArea.scrollTop = chatArea.scrollHeight;
  return icon;
}

function addWaddleDeeBubble(text) {
  const bubble = document.createElement("div");
  bubble.className = "bubble waddledee";
  bubble.textContent = text;
  chatArea.appendChild(bubble);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function addUserBubble(text) {
  const bubble = document.createElement("div");
  bubble.className = "bubble user";
  bubble.textContent = text;
  chatArea.appendChild(bubble);
  chatArea.scrollTop = chatArea.scrollHeight;
}

/* 初期メッセージ */
window.onload = () => {
  const icon = addWaddleDeeIcon();
  setTimeout(() => {
    addWaddleDeeBubble("えへへ…もう数字は決めたよ！当ててみてね☆");
  }, 500);
};

sendBtn.addEventListener("click", () => {

  /* === ゲーム終了後 === */
  if (gameOver) {
    // ★ ここが今回の追加ポイント
    location.href = "room.html";
    return;
  }

  const value = Number(input.value);
  if (!value || value < 1 || value > 100) return;

  count++;
  addUserBubble(value + " だと思う！");

  input.value = "";

  /* ワドルディ：アイコン → 吹き出し */
  setTimeout(() => {
    addWaddleDeeIcon();

    setTimeout(() => {
      if (value === answer) {
        addWaddleDeeBubble("すごいっ！正解だよ〜！！🎉");
        endGame();
      } else if (count >= maxCount) {
        addWaddleDeeBubble(`うーん残念…正解は ${answer} だったよ💦`);
        endGame();
      } else if (value < answer) {
        addWaddleDeeBubble("もっと大きい数字だよ〜！");
      } else {
        addWaddleDeeBubble("もっと小さい数字だよ〜！");
      }
    }, 400);

  }, 400);
});

function endGame() {
  gameOver = true;
  sendBtn.textContent = "終了";
  input.disabled = true;
}
