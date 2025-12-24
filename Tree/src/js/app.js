import { Tree } from './tree.js';

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');
    this.pixelRatio = Math.min(window.devicePixelRatio, 3);

    window.addEventListener('resize', this.resize.bind(this), false);
    window.addEventListener('pointerup', this.click.bind(this), false);

    this.resize();
    this.setBtn();
  }

  setBtn() {
    this.nightBtn = document.querySelector('.night');
    this.dayBtn = document.querySelector('.day');

    this.day = true;

    this.nightBtn.addEventListener(
      'pointerup',
      this.nightBtnHandler.bind(this),
      false
    );
    this.dayBtn.addEventListener('pointerup', this.dayBtnHandler.bind(this), false);
  }

  nightBtnHandler() {
    this.resize();
    this.dayBtn.classList.add('show');
    this.nightBtn.classList.remove('show');
    document.body.classList.add('black');
    this.day = false;
  }

  dayBtnHandler() {
    this.resize();
    this.dayBtn.classList.remove('show');
    this.nightBtn.classList.add('show');
    document.body.classList.remove('black');
    this.day = true;
  }

  resize() {
    this.stageWidth = window.innerWidth;
    this.stageHeight = window.innerHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
  }

  click(event) {
    const { clientX } = event;
    if (event.target.className !== 'material-icons')
      new Tree(this.ctx, clientX, this.stageHeight, this.day);
  }
}

window.onload = () => {
  new App();
};
