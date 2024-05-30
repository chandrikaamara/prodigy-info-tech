let timer;
let isRunning = false;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

function startStop() {
  if (isRunning) {
    clearInterval(timer);
    document.getElementById('startStop').innerHTML = 'Start <i class="fas fa-play"></i>';
  } else {
    timer = setInterval(updateDisplay, 10); // Update every 10 milliseconds
    document.getElementById('startStop').innerHTML = 'Stop <i class="fas fa-stop"></i>';
  }
  isRunning = !isRunning;
}

function reset() {
  clearInterval(timer);
  document.getElementById('display').innerText = '00:00:00.000';
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  isRunning = false;
  document.getElementById('startStop').innerHTML = 'Start <i class="fas fa-play"></i>';
  document.getElementById('pausedTimes').innerHTML = ''; // Clear paused times
}

function updateDisplay() {
  milliseconds += 10;
  if (milliseconds === 1000) {
    milliseconds = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
    }
  }
  const display = document.getElementById('display');
  display.innerText = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${padMilliseconds(milliseconds)}`;
}

function pad(num) {
  return num.toString().padStart(2, '0');
}

function padMilliseconds(num) {
  return num.toString().padStart(3, '0');
}

document.getElementById('startStop').addEventListener('click', startStop);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('pause').addEventListener('click', () => {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('startStop').innerHTML = 'Resume <i class="fas fa-play"></i>';
    const pausedTimes = document.getElementById('pausedTimes');
    const pausedTime = document.createElement('div');
    pausedTime.innerText = `Paused at: ${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${padMilliseconds(milliseconds)}`;
    pausedTimes.appendChild(pausedTime);
  }
});
