let startTime = 0;
let elapsedTime = 0;
let intervalId;
let running = false;
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function formatTime(ms) {
    const date = new Date(ms);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
    return `${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateDisplay, 10);
    running = true;
    startStopBtn.textContent = 'Pause';
    startStopBtn.style.backgroundColor = '#ff9800'; 
}

function stopStopwatch() {
    clearInterval(intervalId);
    running = false;
    startStopBtn.textContent = 'Start';
    startStopBtn.style.backgroundColor = '#4caf50'; 
}

function resetStopwatch() {
    clearInterval(intervalId);
    running = false;
    elapsedTime = 0;
    display.textContent = '00:00:00.00';
    startStopBtn.textContent = 'Start';
    startStopBtn.style.backgroundColor = '#4caf50'; 
    lapsList.innerHTML = '';
}

function recordLap() {
    if (running) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsList.appendChild(lapItem);
        lapsList.scrollTop = lapsList.scrollHeight; 
    }
}

startStopBtn.addEventListener('click', () => {
    if (running) {
        stopStopwatch();
    } else {
        startStopwatch();
    }
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
