const answer = Math.floor(Math.random() * 100) + 1;
const maxTry = 5;
const passcode = "2743"; // ← 暗証番号

let count = 0;
let finished = false;

const chatArea = document.getElementById("chatArea");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", sendMessage);

function sendMessage() {
  if (finished) return;

  const value = Number(input.value);
  if (!value || value < 1 || value > 100) return;

  count++;
  addUserMessage(value);
  input.value = "";

  setTimeout(() => {
    replyFromWaddledee(value);
  }, 600);
}

/* ユーザー吹き出し */
function addUserMessage(text) {
  const chat = document.createElement("div");
  chat.className = "chat right";

  const bubble = document.createElement("div");
  bubble.className = "bubble right-bubble";
  bubble.textContent = text;

  chat.appendChild(bubble);
  chatArea.appendChild(chat);
  scrollBottom();
}

/* ワドルディ返信 */
function replyFromWaddledee(value) {
  let message = "";
  let isSuccess = false;

  if (value === answer) {
    message = `🎉 正解だよ！\n暗証番号は【${passcode}】だよ！`;
    isSuccess = true;
    finished = true;
  } else if (count >= maxTry) {
    message = `残念…😢\n正解は ${answer} だったよ。\nまた遊んでね！`;
    finished = true;
  } else if (value < answer) {
    message = "もっと大きいよ！";
  } else {
    message = "もっと小さいよ！";
  }

  const chat = document.createElement("div");
  chat.className = "chat left";

  const icon = document.createElement("img");
  icon.src = "img02.png";
  icon.className = "icon";

  chat.appendChild(icon);
  chatArea.appendChild(chat);
  scrollBottom();

  setTimeout(() => {
    const bubble = document.createElement("div");
    bubble.className = "bubble left-bubble hidden";
    if (isSuccess) bubble.classList.add("success");
    bubble.textContent = message;

    chat.appendChild(bubble);

    setTimeout(() => {
      bubble.classList.remove("hidden");
      bubble.classList.add("show");
      scrollBottom();
    }, 50);

    if (finished) disableInput();

  }, 500);
}

/* 入力無効化 */
function disableInput() {
  input.disabled = true;
  sendBtn.disabled = true;
  sendBtn.textContent = "終了";
}

/* スクロール */
function scrollBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}
