const findAssetByName = (assetsData = [], assetName = '') =>
  assetsData.find((asset) => asset.name === assetName);

export { findAssetByName };
