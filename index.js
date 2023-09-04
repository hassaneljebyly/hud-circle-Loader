const SVG_CONTAINER = document.getElementById('svg-container');
let windowWidth = window.innerWidth;
SVG_CONTAINER.style = `--svg-scale: ${windowWidth >= 1080 ? 1 : (windowWidth / 1080).toFixed(1)};`;

window.addEventListener('resize', () => {
  windowWidth = window.innerWidth;
  if (windowWidth <= 1080) {
    SVG_CONTAINER.style = `--svg-scale: ${(windowWidth / 1080).toFixed(1)};`;
  }
});

const PROGRESS_VALUE = document.getElementById('progress-value');
let progress = 0;
let tl = anime.timeline({
  loop: true,
});
tl.add({
  targets: '.part',
  translateY: [
    { value: 250, duration: 0 },
    { value: 0, duration: 500 },
  ],
  scale: [
    { value: 0, duration: 0 },
    { value: 1.2, duration: 1000, easing: 'spring(1, 80, 10, 0)' },
    { value: 0, duration: 1000, delay: 2000, easing: 'spring(1, 80, 10, 0)' },
  ],
  rotateX: {
    value: 70,
    duration: 700,
  },
  rotateZ: {
    value: function (el, i, l) {
      let rotateZ = 0;
      i === 6 || i === 4 ? (rotateZ = '.6turn') : '';
      i === 7 ? (rotateZ = 90) : '';
      return rotateZ;
    },
    delay: function (el, i, l) {
      let delay = 100 * (l - i);
      l - i === 5 || l - i === 3 || l - i === 2 ? (delay = 0) : '';
      return delay;
    },
  },
  rotateY: {
    value: function (el, i, l) {
      let rotateY = 0;
      i === 6 || i === 4 ? (rotateY = '-1turn') : '';
      i === 7 ? (rotateY = 90) : '';
      return rotateY;
    },
    delay: function (el, i, l) {
      let delay = 0;
      i === 5 ? (delay = 100) : '';
      return delay;
    },
  },
  translateZ: {
    value: function (el, i, l) {
      let translateY = -40 * (l - i);
      l - i === 5 || l - i === 3 || l - i === 2 || l - i === 1 ? (translateY = 0) : '';
      return translateY;
    },
    delay: 500,
  },

  loop: true,
  easing: 'easeInOutQuad',
})
  .add(
    {
      targets: '.progress-path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 2500,
      easing: 'easeInOutQuad',
      update: function (anim) {
        PROGRESS_VALUE.innerHTML = String(Math.round(anim.progress)).padStart(2, '0');
      },
    },
    0
  )
  .add(
    {
      targets: '.part-7',
      opacity: [{ value: 0, duration: 0 }, { value: 1 }, { value: 0 }, { value: 1 }, { value: 0 }, { value: 1 }, { value: 0 }, { value: 1 }],
      delay: 900,
      easing: 'easeInOutQuad',
    },
    0
  );
