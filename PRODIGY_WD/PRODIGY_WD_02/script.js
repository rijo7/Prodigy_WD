// JavaScript for Stopwatch
var timer;
var running = false;
var laps = [];
var startTime;
var lapTime = 0; // Initialize lapTime to 0

document.getElementById("startStop").addEventListener("click", startStop);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", lap);

function startStop() {
  if (running) {
    clearInterval(timer);
    running = false;
  } else {
    startTime = new Date().getTime() - lapTime;
    timer = setInterval(updateTime, 10);
    running = true;
  }
}

function reset() {
  clearInterval(timer);
  running = false;
  document.getElementById("display").innerHTML = "00:00:00";
  document.getElementById("laps").innerHTML = "";
  laps = [];
  lapTime = 0; // Reset lapTime to 0
}

function lap() {
  if (running) {
    var lapTimeElapsed = new Date().getTime() - startTime;
    var lapDisplay = document.createElement("div");
    lapDisplay.textContent = "Lap " + (laps.length + 1) + ": " + formatTime(lapTimeElapsed);
    document.getElementById("laps").appendChild(lapDisplay);
    laps.push(lapTimeElapsed);
  }
}

function updateTime() {
  lapTime = new Date().getTime() - startTime;
  document.getElementById("display").innerHTML = formatTime(lapTime);
}

function formatTime(time) {
  var hours = Math.floor(time / (1000 * 60 * 60));
  var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((time % (1000 * 60)) / 1000);
  var milliseconds = Math.floor((time % 1000) / 10);
  
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  if (milliseconds < 10) milliseconds = "0" + milliseconds;
  
  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}
