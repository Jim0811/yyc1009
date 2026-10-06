const memories = [
  { title: '從駁二開始', index: '01 / 2026.05.13', text: '一開始在駁二遇見妳時就想著要慢慢認識，沒想到在這一天，男友魚子醬真的正式上崗了。謝謝妳，讓我的生活從這一天開始變得超級幸福。', photo: 'assets/IMG_4550.jpg' },
  { title: '一束手摺玫瑰', index: '02 / OUR LITTLE MOMENTS', text: '鮮花會隨時間枯萎，但這束花不會。就像我給妳的陪伴一樣，安靜、長久，而且每一朵都只屬於妳。', photo: 'assets/IMG_4609.JPG' },
  { title: '最特別的生日', index: '03 / A SPECIAL DAY', text: '那天捧在手心的花很香，但比花更耀眼的是妳眼裡的溫柔。謝謝妳為我準備的一切，讓我知道自己一直被妳深深放在心上。', photo: 'assets/IMG_0219.JPG' },
  { title: '專屬於我的七夕禮物', index: '04 / RUNNING TO YOU', text: '謝謝妳不辭辛勞地跨越距離走向我。那天一起走過台南的街巷，牽著妳的手吹著風，就是我能想像到最浪漫的七夕。', photo: 'assets/IMG_0650.JPG' }
];

const dayNumber = document.getElementById('daysTogether');
const taipeiDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const [year, month, day] = taipeiDate.split('-').map(Number);
const start = Date.UTC(2026, 4, 13);
const today = Date.UTC(year, month - 1, day);
dayNumber.textContent = Math.max(1, Math.floor((today - start) / 86400000) + 1).toLocaleString('zh-TW');

const dialog = document.getElementById('memoryDialog');
const dialogArt = document.getElementById('dialogArt');
document.querySelectorAll('.memory-card').forEach((card, i) => {
  const art = card.querySelector('.memory-art');
  if (memories[i].photo) {
    const img = new Image();
    img.src = memories[i].photo;
    img.alt = memories[i].title;
    img.className = 'memory-photo';
    img.onload = () => { art.prepend(img); art.classList.add('has-photo'); };
  }
  card.addEventListener('click', () => {
    document.getElementById('dialogIndex').textContent = memories[i].index;
    document.getElementById('dialogTitle').textContent = memories[i].title;
    document.getElementById('dialogText').textContent = memories[i].text;
    dialogArt.className = 'dialog-art memory-' + ['one', 'two', 'three', 'four'][i];
    dialogArt.style.backgroundImage = art.classList.contains('has-photo') ? `url("${memories[i].photo}")` : getComputedStyle(art).backgroundImage;
    dialog.showModal();
  });
});
document.getElementById('closeDialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

const video = document.getElementById('birthdayVideo');
const videoSoundButton = document.getElementById('videoSoundButton');
const soundHint = document.getElementById('soundHint');
let onVideoPage = false;
let soundUnlocked = false;
let playbackAttempt = 0;

function updateSoundPrompt() {
  soundHint.hidden = soundUnlocked || onVideoPage;
  videoSoundButton.hidden = !onVideoPage || !video.muted;
}

async function playRecordingWithSound() {
  const attempt = ++playbackAttempt;
  video.muted = false;
  try {
    await video.play();
    if (attempt === playbackAttempt) soundUnlocked = true;
  } catch {
    if (attempt !== playbackAttempt) return;
    video.muted = true;
    await video.play().catch(() => {});
  }
  if (attempt === playbackAttempt) updateSoundPrompt();
}

// Browsers can block audible autoplay until the visitor interacts with the page.
for (const eventName of ['pointerdown', 'touchend', 'keydown']) {
  document.addEventListener(eventName, () => {
    if (!soundUnlocked) void playRecordingWithSound();
  }, { passive: true });
}

video.addEventListener('volumechange', updateSoundPrompt);
video.addEventListener('error', () => showToast('影片載入失敗，請重新整理頁面。'));
videoSoundButton.addEventListener('click', () => void playRecordingWithSound());

const penguinButton = document.getElementById('penguinButton');
const particleLayer = document.getElementById('particleLayer');
const penguinMessage = document.getElementById('penguinMessage');
const messages = ['小企鵝報到！今天也要讓妳充飽電 ♡', '汪汪也來了：妳永遠是最棒的！', '抱抱已送達，今天的快樂請簽收。'];
let messageIndex = 0;
penguinButton.addEventListener('click', () => {
  penguinMessage.textContent = messages[messageIndex++ % messages.length];
  const symbols = ['♡', '♥', '🐧', '🐾', '✦'];
  for (let i = 0; i < 16; i++) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.setProperty('--x', `${Math.round((Math.random() - .5) * 580)}px`);
    particle.style.setProperty('--y', `${-90 - Math.round(Math.random() * 220)}px`);
    particle.style.setProperty('--r', `${Math.round((Math.random() - .5) * 90)}deg`);
    particle.style.animationDelay = `${i * 25}ms`;
    particle.style.color = i % 2 ? '#a35f5b' : '#fff9ee';
    particleLayer.appendChild(particle);
    particle.addEventListener('animationend', () => particle.remove());
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) setTimeout(() => particle.remove(), 100);
  }
});

const pages = [...document.querySelectorAll('.story-page')];
const revealSelector = '.hero-content > *, .intro-grid > *, .section-heading > *, .memory-card, .interlude > *, .letter-intro > *, .letter-body > p, .final-inner > :not(.particle-layer), .video-copy > *, .video-frame';
pages.forEach(page => {
  page.querySelectorAll(revealSelector).forEach((item, index) => {
    item.classList.add('reveal');
    item.style.setProperty('--reveal-delay', `${Math.min(index * 85, 500)}ms`);
  });
});
document.documentElement.classList.add('motion-ready');

if ('IntersectionObserver' in window) {
  const pageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const active = entry.isIntersecting && entry.intersectionRatio >= .35;
      entry.target.classList.toggle('is-current', active);
      if (entry.target.id === 'song') {
        onVideoPage = active;
        if (active && video.paused) void playRecordingWithSound();
        updateSoundPrompt();
      }
    });
  }, { threshold: [0, .35, .7] });
  pages.forEach(page => pageObserver.observe(page));
} else {
  pages.forEach(page => page.classList.add('is-current'));
}
void playRecordingWithSound();
