import { assetsData } from './assetsData';
import { findAssetByName } from '../utils/findAssetByName';

const heroAssetData = findAssetByName(assetsData, 'hero');

export { heroAssetData };
