let answer = Math.floor(Math.random() * 100) + 1;
let remain = 5;
let finished = false;

const chat = document.getElementById("chat");
const input = document.getElementById("numInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", send);

function send() {
  if (finished) return;

  const value = Number(input.value);
  if (!value) return;

  input.value = "";

  addUserMessage(value);
  remain--;

  // ① 少し待ってからワドルディ登場
  setTimeout(() => {
    waddleReply(value);
  }, 500);
}

function addUserMessage(text) {
  chat.innerHTML += `
    <div class="message user">
      <div class="bubble">${text}</div>
    </div>
  `;
  chat.scrollTop = chat.scrollHeight;
}

function waddleReply(value) {
  let msg = "";
  let isCorrect = false;

  if (value === answer) {
    msg = "正解〜！！🎉🎉";
    isCorrect = true;
    finished = true;
    showFullWaddle();
  } else if (value < answer) {
    msg = `もっと大きいよ！\n残り ${remain} 回`;
  } else {
    msg = `もっと小さいよ！\n残り ${remain} 回`;
  }

  if (remain <= 0 && !isCorrect) {
    msg = `残念…💦\n答えは ${answer} だったよ`;
    finished = true;
  }

  const bubbleClass = isCorrect ? "bubble correct" : "bubble";

  chat.innerHTML += `
    <div class="message waddle">
      <img src="img_waddle_icon.png" class="icon">
      <div class="${bubbleClass}">
        ${msg.replace(/\n/g, "<br>")}
      </div>
    </div>
  `;

  chat.scrollTop = chat.scrollHeight;
}

function showFullWaddle() {
  const div = document.createElement("div");
  div.className = "full-waddle";
  document.body.appendChild(div);
}
