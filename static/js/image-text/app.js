import { Visual } from "./visual.js";
import { setColor, setColor2 } from "./color.js";
import { Text } from "./text.js";
import { commonImg } from "./commonImg";

export class App {
  constructor(_text) {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    this.thumbs = [];

    const ul = document.getElementById("upload-image");
    const lis = ul.getElementsByTagName("li");

    for (let i = 0; i < lis.length; i++) {
      const item = lis[i];
      const img = item.getElementsByTagName("img")[0];
      // img.crossOrigin = ""

      item.addEventListener(
        "click",
        (e) => {
          this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
          this.show(i);
        },
        false
      );

      this.thumbs[i] = {
        item,
        img: img.src,
      };
    }

    this.textStr = _text;

    this.text = new Text();

    // window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  async show(index) {
    for (let i = 0; i < this.thumbs.length; i++) {
      const item = this.thumbs[i].item;
      if (i == index) {
        item.classList.add("selected");
      } else {
        item.classList.remove("selected");
      }
    }

    const img = this.thumbs[index].img;
    console.log("img:", img);

    await setColor(img).then((obj) => {
      console.log(" obj.colorCtx: ", obj.colorCtx);
      this.visual = new Visual(
        this.pos,
        obj.colorCtx,
        obj.width,
        obj.height,
        this.textStr
      );
    });
  }

  resize() {
    const __nextHeight = document.getElementById("__next").offsetHeight;
    // console.log("__nextHeight", __nextHeight);
    this.stageWidth = document.body.clientWidth;
    console.log("document.body.clientHeight:", document.body.clientHeight);
    this.stageHeight = document.body.clientHeight - __nextHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
    console.log("this.textStr:", this.textStr);

    this.pos = this.text.setText(
      this.textStr,
      6,
      this.stageWidth,
      this.stageHeight
    );
  }

  setText(_text) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.textStr = _text;
  }

  animate(t) {
    //   캔버스 클리어
    // this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    requestAnimationFrame(this.animate.bind(this));
    if (this.visual) {
      this.visual.animate(this.ctx);
    }
  }
}
