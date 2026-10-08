/* ============================================================
 * 武汉 · 城市记忆
 * 数据层：每个记忆节点
 *   year     年份标签
 *   title    主题
 *   fact     史实注解（可选，素材补充后自动显示）
 *   images   [[图片地址, 画面注解], ...]
 * ============================================================ */
const FALLBACK_IMG = './assets/archive-river.svg';

const memories = [
  {
    year: '约前 14 世纪',
    title: '盘龙城',
    fact: '盘龙城遗址位于黄陂府河北岸，是长江流域已知最早的商代城址之一，距今约三千五百年。城垣与青铜器证明，武汉的城市文明由此发端。',
    images: [
      ['./assets/photos/panlongcheng-1.jpg', '城垣与宫殿基址，时间沉积成土', '盘龙城博物院'],
      ['./assets/photos/panlongcheng-2.jpg', '茅茨土阶，复原三千五百年前的宫城', '盘龙城博物院'],
      ['./assets/photos/panlongcheng-3.jpg', '俯瞰盘龙城，江汉平原上最早的城印', '盘龙城博物院'],
    ],
  },
  {
    year: '1861',
    title: '汉口开埠',
    fact: '1861年汉口依《天津条约》正式开埠，英、俄、法、德、日相继设立租界。此后数十年间，汉口成长为内地最大的通商口岸，被誉为“东方芝加哥”。',
    images: [
      ['./assets/photos/1861-1.jpg', '江岸码头，向世界敞开', '维基共享资源'],
      ['./assets/photos/1861-2.jpg', '千帆泊岸，商船云集大江', '维基共享资源'],
      ['./assets/photos/1861-3.jpg', '洋行林立，街巷逐渐苏醒', '维基共享资源'],
    ],
  },
  {
    year: '1911',
    title: '辛亥首义',
    fact: '1911年10月10日武昌新军起义，次日成立鄂军都督府，史称辛亥首义。各省响应之下，两千余年帝制就此终结，武昌从此被称为“首义之城”。',
    images: [
      ['./assets/photos/1911-1.jpg', '旧邦新造，时代在此转身', '维基共享资源'],
      ['./assets/photos/1911-2.jpg', '一页历史，从报刊与呐喊中翻开', '维基共享资源'],
      ['./assets/photos/1911-3.jpg', '首义枪声，自武昌城头响起', '维基共享资源'],
    ],
  },
  {
    year: '1949',
    title: '武汉解放',
    fact: '1949年5月16日至17日，人民解放军相继进入汉口、汉阳、武昌，武汉三镇解放。护厂护城的重任由工人与市民完成，江城完整地翻开新篇。',
    images: [
      ['./assets/photos/1949-1.jpg', '车轮滚滚，解放军进入汉口', '长江日报'],
      ['./assets/photos/1949-2.jpg', '一九四九年五月十六日，武汉全部解放', '解放日报'],
    ],
  },
  {
    year: '1957',
    title: '长江大桥',
    fact: '1957年10月15日武汉长江大桥建成通车，是万里长江上第一座公路铁路两用桥。“一桥飞架南北，天堑变通途”，京广铁路由此全线贯通。',
    images: [
      ['./assets/photos/1957-1.jpg', '通车之日，万人空巷过大江', '人民画报'],
      ['./assets/photos/1957-2.jpg', '登上画报封面，成为国家记忆', '人民画报'],
      ['./assets/photos/1957-3.jpg', '六十余载，桥上川流不息', '人民画报'],
    ],
  },
  {
    year: '1998',
    title: '守护江城',
    fact: '1998年夏长江发生流域性特大洪水，武汉关最高水位达29.43米。数十万军民坚守大堤两个多月，龙王庙闸口的“生死牌”成为那一年最深的城记。',
    images: [
      ['./assets/photos/1998-1.jpg', '洪峰压境，以身为堤', '新华社'],
      ['./assets/photos/1998-2.jpg', '惊涛之下，堤在人在', '新华社'],
      ['./assets/photos/1998-3.jpg', '后来的敬礼，献给守护江城的人', '长江日报'],
    ],
  },
  {
    year: '2020',
    title: '春天重启',
    fact: '2020年1月23日武汉“封城”，76天后于4月8日重启。火神山、雷神山医院十余天建成，四万余名医护人员驰援江城。',
    images: [
      ['./assets/photos/2020-3.jpg', '静下来的街道，等待春风', '新华社'],
      ['./assets/photos/2020-1.jpg', '十天十夜，火神山拔地而起', '新华社'],
      ['./assets/photos/2020-2.jpg', '白衣执甲，把祝福写在背上', '新华社'],
    ],
  },
  {
    year: '今天',
    title: '向新而行',
    fact: '今天的武汉拥有十余座长江大桥与过江通道，两江四岸灯火点亮天际线。光谷汇聚百万大学生，江水不停，故事未完。',
    images: [
      ['./assets/photos/today-1.jpg', '黄鹤依旧，江城日新', '现代摄影'],
      ['./assets/photos/today-2.jpg', '两江四岸，灯火向新', '现代摄影'],
      ['./assets/photos/today-3.jpg', '江水不停，故事未完', '现代摄影'],
    ],
  },
];

/* 八个节点在长江路径上的位置（占总长度的比例） */
const RIVER_FRACTIONS = [0.03, 0.164, 0.299, 0.433, 0.567, 0.701, 0.836, 0.97];

/* ============================================================
 * 元素引用与状态
 * ============================================================ */
const rail = document.querySelector('#year-rail');
const stage = document.querySelector('#image-stage');
const track = document.querySelector('#gallery-track');
const mainImage = document.querySelector('#main-image');
const mainCard = document.querySelector('#main-card');
const previousPreview = document.querySelector('#previous-preview');
const nextPreview = document.querySelector('#next-preview');
const basePath = document.querySelector('#river-base');
const progressPath = document.querySelector('#river-progress');
const gestureHint = document.querySelector('#gesture-hint');
const compareEl = document.querySelector('#compare');
const compareAfter = document.querySelector('#compare-after');
const compareHandle = document.querySelector('#compare-handle');
const cover = document.querySelector('#cover');
const coverEnter = document.querySelector('#cover-enter');
const experience = document.querySelector('#experience');

const out = {
  year: document.querySelector('#active-year'),
  title: document.querySelector('#active-title'),
  fact: document.querySelector('#image-fact'),
  note: document.querySelector('#image-note'),
  count: document.querySelector('#image-count'),
  counter: document.querySelector('#counter'),
  live: document.querySelector('#live-region'),
};

/* 封面状态 */
let coverVisible = true;

let yearIndex = 0;
let imageIndex = 0;
let locked = false;
let dragStart = null;
let wheelAccumulator = 0;
let wheelResetTimer = null;
const yearButtons = [];

const isMobile = () => window.matchMedia('(max-width: 700px)').matches;
const pad2 = (value) => String(value).padStart(2, '0');

/* ============================================================
 * 时间轴：节点精确落在河道上（getPointAtLength）
 * ============================================================ */
const riverLength = basePath.getTotalLength();

function placeOnRiver(button, fraction) {
  const point = basePath.getPointAtLength(fraction * riverLength);
  button.style.left = `${(point.x / 180) * 100}%`;
  button.style.top = `${(point.y / 700) * 100}%`;
  // 河道靠右（viewBox 中线 x=90）时，标签让到圆点左侧
  button.classList.toggle('align-left', point.x > 90);
}

memories.forEach((memory, index) => {
  const button = document.createElement('button');
  button.className = 'year-button';
  button.type = 'button';
  button.textContent = memory.year;
  button.setAttribute('aria-label', `${memory.year}，${memory.title}`);
  placeOnRiver(button, RIVER_FRACTIONS[index]);
  button.addEventListener('click', () => {
    changeYear(index, Math.sign(index - yearIndex) || 1);
  });
  rail.append(button);
  yearButtons.push(button);
});

/* ============================================================
 * 渲染
 * ============================================================ */
function imageAt(offset) {
  const images = memories[yearIndex].images;
  return images[(imageIndex + offset + images.length) % images.length];
}

/* 图片加载失败回退 */
function attachFallback(img) {
  img.onerror = () => {
    if (img.src !== FALLBACK_IMG) {
      img.src = FALLBACK_IMG;
    }
  };
}

/* 1957 对比滑块状态 */
function isCompareFrame() {
  return memories[yearIndex].year === '1957' && imageIndex === 0;
}

function render() {
  const memory = memories[yearIndex];
  const current = imageAt(0);
  const previous = imageAt(-1);
  const next = imageAt(1);

  mainImage.src = current[0];
  mainImage.alt = `${memory.year} · ${memory.title}`;
  attachFallback(mainImage);
  previousPreview.src = previous[0];
  previousPreview.alt = `${memory.year} 上一张影像`;
  attachFallback(previousPreview);
  nextPreview.src = next[0];
  nextPreview.alt = `${memory.year} 下一张影像`;
  attachFallback(nextPreview);

  out.year.textContent = memory.year;
  out.title.textContent = memory.title;
  out.fact.textContent = memory.fact ?? '';
  out.note.textContent = current[2] ? `${current[1]}　${current[2]}` : current[1];
  out.count.textContent = `${pad2(imageIndex + 1)} / ${pad2(memory.images.length)}`;
  out.counter.textContent = `${pad2(yearIndex + 1)} / ${pad2(memories.length)}`;

  // 2 帧时上一张与下一张重合，只保留右侧预览卡
  track.classList.toggle('dual', memory.images.length === 2);

  // 1957 对比滑块：仅第一帧显示
  const showCompare = isCompareFrame();
  compareEl.classList.toggle('visible', showCompare);
  compareEl.setAttribute('aria-hidden', String(!showCompare));
  if (showCompare) {
    compareAfter.src = './assets/photos/1957-3.jpg';
    attachFallback(compareAfter);
  }

  yearButtons.forEach((button, index) => {
    button.classList.toggle('active', index === yearIndex);
    button.setAttribute('aria-current', index === yearIndex ? 'true' : 'false');
  });

  // 河道进度：实线覆盖到当前节点
  progressPath.style.strokeDashoffset = String(100 * (1 - RIVER_FRACTIONS[yearIndex]));

  // 移动端横向条自动把当前年份滚到中间
  if (isMobile()) {
    yearButtons[yearIndex].scrollIntoView({ inline: 'center', block: 'nearest' });
  }

  // 屏幕阅读器播报
  out.live.textContent = `${memory.year}，${memory.title}。${current[1]}`;
}

/* ============================================================
 * 切换逻辑
 * ============================================================ */
function animate(direction) {
  if (locked) return;
  locked = true;
  stage.classList.add('switching', direction > 0 ? 'to-next' : 'to-previous');
  window.setTimeout(() => {
    stage.classList.remove('switching', 'to-next', 'to-previous');
    locked = false;
  }, 690);
}

function changeImage(direction) {
  if (locked) return;
  const total = memories[yearIndex].images.length;
  imageIndex = (imageIndex + direction + total) % total;
  render();
  animate(direction);
}

function changeYear(index, direction) {
  if (locked || index === yearIndex) return;
  yearIndex = index;
  imageIndex = 0;
  render();
  animate(direction);
}

/* 沿年份步进：首尾钳制，不再静默循环 */
function stepYear(direction) {
  const target = yearIndex + direction;
  if (target < 0 || target >= memories.length) return;
  changeYear(target, direction);
}

/* ============================================================
 * 按钮：上一帧 / 下一帧
 * ============================================================ */
document.querySelector('#previous-image').addEventListener('click', () => changeImage(-1));
document.querySelector('#next-image-button').addEventListener('click', () => changeImage(1));

/* ============================================================
 * 滚轮：滚动量累积到阈值才切换年份
 * ============================================================ */
const WHEEL_THRESHOLD = 80;

stage.addEventListener(
  'wheel',
  (event) => {
    event.preventDefault();
    if (locked) return;
    // deltaMode 1（逐行）时换算成像素量
    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : 1);
    wheelAccumulator += delta;

    clearTimeout(wheelResetTimer);
    wheelResetTimer = window.setTimeout(() => {
      wheelAccumulator = 0;
    }, 220);

    if (Math.abs(wheelAccumulator) >= WHEEL_THRESHOLD) {
      stepYear(wheelAccumulator > 0 ? 1 : -1);
      wheelAccumulator = 0;
    }
  },
  { passive: false },
);

/* ============================================================
 * 拖拽：横向切帧，纵向切年份
 * ============================================================ */
stage.addEventListener('pointerdown', (event) => {
  if (event.button !== 0 || locked) return;
  dragStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
  stage.setPointerCapture(event.pointerId);
});

stage.addEventListener('pointermove', (event) => {
  if (!dragStart || event.pointerId !== dragStart.id) return;
  const dx = event.clientX - dragStart.x;
  const dy = event.clientY - dragStart.y;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 7) return;

  const useX = Math.abs(dx) > Math.abs(dy);
  const amount = Math.max(-90, Math.min(90, useX ? dx : dy));
  stage.style.setProperty('--drag-x', useX ? `${amount}px` : '0px');
  stage.style.setProperty('--drag-y', useX ? '0px' : `${amount * 0.35}px`);
  stage.classList.add('dragging');
});

function finishDrag(event) {
  if (!dragStart || event.pointerId !== dragStart.id) return;
  const dx = event.clientX - dragStart.x;
  const dy = event.clientY - dragStart.y;

  stage.classList.remove('dragging');
  stage.style.removeProperty('--drag-x');
  stage.style.removeProperty('--drag-y');

  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 55) {
    changeImage(dx < 0 ? 1 : -1);
  } else if (Math.abs(dy) > 55) {
    stepYear(dy < 0 ? 1 : -1);
  }
  dragStart = null;
}

stage.addEventListener('pointerup', finishDrag);
stage.addEventListener('pointercancel', finishDrag);

/* ============================================================
 * 键盘：←→ 切帧，↑↓ 切年份，Home/End 首尾
 * ============================================================ */
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault();
      changeImage(-1);
      break;
    case 'ArrowRight':
      event.preventDefault();
      changeImage(1);
      break;
    case 'ArrowUp':
      event.preventDefault();
      stepYear(-1);
      break;
    case 'ArrowDown':
      event.preventDefault();
      stepYear(1);
      break;
    case 'Home':
      event.preventDefault();
      changeYear(0, -1);
      break;
    case 'End':
      event.preventDefault();
      changeYear(memories.length - 1, 1);
      break;
    default:
      break;
  }
});

/* ============================================================
 * 触控设备：换成滑动提示
 * ============================================================ */
if (window.matchMedia('(pointer: coarse)').matches) {
  gestureHint.innerHTML = '上下滑动穿越年代<br />左右滑动切换影像';
}

/* ============================================================
 * 1957 今昔对比滑块
 * ============================================================ */
let compareDragging = false;

function updateCompare(clientX) {
  const rect = mainCard.getBoundingClientRect();
  const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
  compareAfter.style.clipPath = `inset(0 0 0 ${pct}%)`;
  compareHandle.style.left = `${pct}%`;
}

compareEl.addEventListener('pointerdown', (event) => {
  if (!isCompareFrame()) return;
  compareDragging = true;
  compareEl.setPointerCapture(event.pointerId);
  updateCompare(event.clientX);
  event.stopPropagation();
});

compareEl.addEventListener('pointermove', (event) => {
  if (!compareDragging) return;
  updateCompare(event.clientX);
});

compareEl.addEventListener('pointerup', () => {
  compareDragging = false;
});

compareEl.addEventListener('pointercancel', () => {
  compareDragging = false;
});

/* ============================================================
 * 封面序章：滚轮向下 / 上滑 / 点击提示 → 切入主题页
 * ============================================================ */
let coverEntering = false;
let coverTouchY = null;

function enterExperience() {
  if (!coverVisible || coverEntering) return;
  coverEntering = true;
  coverVisible = false;
  cover.classList.add('fade-out');
  experience.setAttribute('aria-hidden', 'false');
  cover.setAttribute('aria-hidden', 'true');
  coverEnter.setAttribute('tabindex', '-1');
  window.setTimeout(() => {
    cover.style.display = 'none';
  }, 900);
}

/* 滚轮：任意向下滚动立即切入（拦截，避免穿透到主页） */
cover.addEventListener(
  'wheel',
  (event) => {
    event.preventDefault();
    if (Math.abs(event.deltaY) >= 4 && !coverEntering) {
      enterExperience();
    }
  },
  { passive: false },
);

/* 触屏：上滑切入 */
cover.addEventListener('touchstart', (event) => {
  coverTouchY = event.touches[0].clientY;
}, { passive: true });

cover.addEventListener('touchend', (event) => {
  if (coverTouchY === null) return;
  const dy = event.changedTouches[0].clientY - coverTouchY;
  coverTouchY = null;
  if (dy < -40) enterExperience();
}, { passive: true });

/* 点击提示或 Enter / 空格也可进入（无障碍兜底） */
coverEnter.addEventListener('click', enterExperience);
document.addEventListener('keydown', (event) => {
  if (coverVisible && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    enterExperience();
  }
});

render();
