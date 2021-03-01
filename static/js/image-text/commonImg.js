export const commonImg = () => {
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
};
