const memories = [
  { title: '從駁二開始', index: '01 / 2026.05.13', text: '那天的風、那天的妳，還有我藏不住的悸動。從這一天開始，我們的故事有了第一頁。', photo: null },
  { title: '一朵手摺玫瑰', index: '02 / OUR LITTLE MOMENTS', text: '這朵玫瑰也許不完美，卻裝著我想親手交給妳的認真和喜歡。', photo: null },
  { title: '牽著手的陪伴', index: '03 / ALWAYS HERE', text: '畢業典禮與忙碌的日子，都想站在妳身邊。妳可以勇敢往前走，也可以放心靠著我。', photo: null },
  { title: '開學後的散步', index: '04 / AND EVERY DAY AFTER', text: '沒有特別的安排，和妳一起走著、聊著、笑著，就是我最喜歡的日常。', photo: null }
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

const musicButton = document.getElementById('musicButton');
const audio = document.getElementById('birthdayAudio');
musicButton.addEventListener('click', async () => {
  if (!audio.paused) {
    audio.pause();
    musicButton.setAttribute('aria-pressed', 'false');
    musicButton.setAttribute('aria-label', '播放音樂');
    return;
  }
  if (!audio.getAttribute('src')) {
    showToast('專屬歌曲的位置已準備好，等我們把歌放進來 ♫');
    return;
  }
  try {
    await audio.play();
    musicButton.setAttribute('aria-pressed', 'true');
    musicButton.setAttribute('aria-label', '暫停音樂');
  } catch {
    showToast('專屬歌曲的位置已準備好，等我們把歌放進來 ♫');
  }
});
audio.addEventListener('error', () => { musicButton.setAttribute('aria-pressed', 'false'); });

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
