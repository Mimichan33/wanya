// ===== 初期設定 =====
const answer = Math.floor(Math.random() * 100) + 1;
let count = 0;

const chatArea = document.getElementById("chatArea");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// ===== 送信処理 =====
sendBtn.addEventListener("click", () => {
  const value = Number(input.value);
  if (!value) return;

  count++;

  // ユーザーの吹き出しを追加
  addUserMessage(value);
  input.value = "";

  // 少し待ってワドルディ返信
  setTimeout(() => {
    replyFromWaddledee(value);
  }, 600);
});

// ===== ユーザー吹き出し =====
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

// ===== ワドルディ返信 =====
function replyFromWaddledee(value) {
  let message = "";

  if (value === answer) {
    message = "正解だよ！🎉";
  } else if (value < answer) {
    message = "もっと大きいよ！";
  } else {
    message = "もっと小さいよ！";
  }

  // chat全体
  const chat = document.createElement("div");
  chat.className = "chat left";

  // アイコン
  const icon = document.createElement("img");
  icon.src = "img02.png";
  icon.className = "icon";

  chat.appendChild(icon);
  chatArea.appendChild(chat);
  scrollBottom();

  // 少し待って吹き出し表示
  setTimeout(() => {
    const bubble = document.createElement("div");
    bubble.className = "bubble left-bubble hidden";
    bubble.textContent = message;

    chat.appendChild(bubble);

    // アニメーション開始
    setTimeout(() => {
      bubble.classList.remove("hidden");
      bubble.classList.add("show");
      scrollBottom();
    }, 50);

  }, 500);
}

// ===== 下までスクロール =====
function scrollBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}
