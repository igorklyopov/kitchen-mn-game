import { assetsData } from './assetsData.js';
import {findAssetByName} from '../utils/findAssetByName.js'

const heroAssetData = findAssetByName(assetsData, 'hero');

export { heroAssetData };
