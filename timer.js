let timerRemaining = 0;
let timerInterval = null;

const display = document.getElementById("timer-display");
const btnStart = document.getElementById("btn-start");
const btnStop = document.getElementById("btn-stop");

// 数値を2桁の文字列にする（例: 5 → "05"）。
function pad(number) {
  return String(number).padStart(2, "0");
}

// 秒数を「MM:SS」または「HH:MM:SS」形式にする。
function formatTime(seconds) {
  if (seconds >= 3600) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${pad(minutes)}:${pad(remainingSeconds)}`;
}

function updateDisplay() {
  display.textContent = formatTime(timerRemaining);
}

function updateButtons(running) {
  btnStart.disabled = running || timerRemaining <= 0;
  btnStop.disabled = !running;
}

function clearRunningTimer() {
  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// 選択した分数をタイマーへ設定する。
function selectTimer(minutes) {
  clearRunningTimer();
  timerRemaining = minutes * 60;
  updateDisplay();
  updateButtons(false);
}

// カウントダウンを開始する。
function startTimer() {
  if (timerInterval !== null || timerRemaining <= 0) {
    return;
  }

  updateButtons(true);
  timerInterval = setInterval(() => {
    timerRemaining -= 1;
    updateDisplay();

    if (timerRemaining <= 0) {
      clearRunningTimer();
      updateButtons(false);
    }
  }, 1000);
}

// 現在の残り時間で一時停止する。
function stopTimer() {
  clearRunningTimer();
  updateButtons(false);
}

// タイマーを初期状態へ戻す。
function resetTimer() {
  clearRunningTimer();
  timerRemaining = 0;
  updateDisplay();
  updateButtons(false);
}

updateDisplay();
updateButtons(false);
