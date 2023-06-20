class SketchPad {
  constructor(container, onUpdate = null, size = 400) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = size;
    this.canvas.height = size;
    this.canvas.style.backgroundColor = 'white';
    this.canvas.style.boxShadow = '0px 0px 10px 2px black';
    container.appendChild(this.canvas);

    const lineBreak = document.createElement('br');
    container.appendChild(lineBreak);

    this.undoBtn = document.createElement('button');
    this.undoBtn.innerHTML = 'UNDO';
    container.appendChild(this.undoBtn);

    this.ctx = this.canvas.getContext('2d');
    this.onUpdate = onUpdate;
    this.reset();
    this.addEventListeners();
  }

  reset() {
    this.paths = [];
    this.isDrawing = false;
    this.redraw();
  }

  addEventListeners() {
    this.canvas.onmousedown = (e) => {
      const mouse = this.getMouse(e);
      this.paths.push([mouse]);
      this.isDrawing = true;
    };

    this.canvas.onmousemove = (e) => {
      if (this.isDrawing) {
        const mouse = this.getMouse(e);
        const lastPath = this.paths[this.paths.length - 1];
        lastPath.push(mouse);
        this.redraw();
      }
    };

    document.onmouseup = () => {
      this.isDrawing = false;
    };

    this.canvas.ontouchstart = (e) => {
      const loc = e.touches[0];
      this.canvas.onmousedown(loc);
    };

    this.canvas.ontouchmove = (e) => {
      const loc = e.touches[0];
      this.canvas.onmousemove(loc);
    };

    document.ontouchend = (e) => {
      document.onmouseup();
    };

    this.undoBtn.onclick = () => {
      this.paths.pop();
      this.redraw();
    };
  }

  redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawPaths();
    this.undoBtn.disabled = this.paths.length === 0;
    if (this.onUpdate) {
      this.onUpdate(this.paths);
    }
  }

  drawPaths() {
    for (const path of this.paths) {
      this.ctx.beginPath();
      for (let i = 0; i < path.length; i++) {
        const { x, y } = path[i];
        if (i === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      this.ctx.stroke();
    }
  }

  getMouse(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    };
  }
}
