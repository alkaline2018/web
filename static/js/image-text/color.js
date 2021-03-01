import { Img } from "@chakra-ui/react";

export async function setColor(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = url;

    image.onload = () => {
      if (image.complete) {
        const tmpCanvas = document.createElement("canvas");
        tmpCanvas.width = image.width;
        tmpCanvas.height = image.height;
        image.crossOrigin = "anonymous";
        const tmpCtx = tmpCanvas.getContext("2d");
        tmpCtx.drawImage(image, 0, 0, image.width, image.height);

        if (image.height > 0) {
          resolve({
            colorCtx: tmpCtx,
            width: image.width,
            height: image.height,
          });
        }
      }
    };
  });
}
