function loadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.src;
    img.id = image.name;

    img.onload = () => {
      resolve(img);
    };

    img.onerror = () => {
      reject(new Error(`image with src ${image} not load`));
    };
  });
}

function loadAssets(assetsData) {
  const assets = [];

  assetsData.forEach((assetItem) => {
    const asset = loadImage(assetItem);
    assets.push(asset);
  });

  return Promise.all(assets);
}

const findImgById = (images, imgId) =>
  images.find((image) => image.id === imgId);

export { loadAssets,findImgById };
