// ============================================================
// SCREEN NAVIGATION — sab screens ek hi page pe hain,
// bas show/hide ho rahi hain
// ============================================================
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + name).classList.add('active');

  const video = document.getElementById('bg-video');

  // Background video SIRF autopilot screen par chalega
  if (name === 'autopilot') {
    video.currentTime = 0;
    video.play();
  } else {
    video.pause();
  }

  if (name === 'camera') startCamera();
  if (name === 'manual' || name === 'autopilot') updateDummyData();
}

// ============================================================
// CAMERA ACCESS — jab phone ko "camera" ki tarah use karna ho
// ============================================================
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    document.getElementById('camera-feed').srcObject = stream;

    // TODO: jab Python backend (Flask) ready ho jaye, yahan
    // setInterval laga ke har 3-5 second me is video se ek
    // frame capture karke fetch() se backend ko bhejna hai.
    // Abhi sirf local preview dikha rahe hain.
  } catch (err) {
    alert('Camera access nahi mil paaya: ' + err.message);
  }
}

// ============================================================
// MANUAL MODE — motor ko haath se on/off karna
// ============================================================
const motorState = { 1: false, 2: false };

function toggleMotor(num) {
  motorState[num] = !motorState[num];
  const el = document.getElementById('toggle-motor' + num);
  el.classList.toggle('on', motorState[num]);
  el.setAttribute('aria-checked', motorState[num]);

  // TODO: jab Arduino/backend connect ho jaye, yahan se real
  // command bhejna hai, jaise:
  // fetch('/set-motor', {
  //   method: 'POST',
  //   body: JSON.stringify({ motor: num, state: motorState[num] })
  // });
}

// Keyboard se bhi toggle ho sake (Enter / Space)
document.querySelectorAll('.toggle').forEach(t => {
  t.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      t.click();
    }
  });
});

// ============================================================
// DASHBOARD DATA — ABHI DUMMY HAI
// ============================================================
function updateDummyData() {
  // TODO: real backend banne ke baad, yahan
  // fetch('/status').then(r => r.json()).then(data => {...})
  // se asli count/temp/motor status lena hai.
  // Abhi sirf demo dikhane ke liye fixed values hain.
  document.getElementById('manual-count').innerText = 8;
  document.getElementById('manual-temp').innerText = 31;
  document.getElementById('manual-humidity').innerText = 58;
  document.getElementById('auto-count').innerText = 8;
  document.getElementById('auto-temp').innerText = 31;
  document.getElementById('auto-motor1').innerText = 'ON';
  document.getElementById('auto-motor2').innerText = 'OFF';
}
