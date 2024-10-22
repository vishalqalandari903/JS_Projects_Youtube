const startPauseBtn = document.querySelector(".startPauseBtn");
const resetBtn = document.querySelector(".resetBtn");
const time = document.querySelector(".time");

let [h, m, s] = [0, 0, 0];
let timer;

function startStopWatch() {
  timer = setInterval(() => {
    s++;
    if (s == 60) {
      m++;
      s = 0;
      if (m == 60) {
        h++;
        m = 0;
      }
    }

    time.innerHTML = `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${
      s < 10 ? "0" + s : s
    }`;
  }, 1000);
}

function pauseStopWatch() {
  clearInterval(timer);
  timer = null;
}

function resetStopWatch() {
  h = m = s = 0;
  time.innerHTML = "00:00:00";
  startPauseBtn.innerHTML = "Start";
  clearInterval(timer);
  timer = null;
}

startPauseBtn.addEventListener("click", () => {
  if (!timer) {
    startPauseBtn.innerHTML = "Pause";
    startStopWatch();
  } else {
    startPauseBtn.innerHTML = "Start";
    pauseStopWatch();
  }
});

resetBtn.addEventListener("click", resetStopWatch);
