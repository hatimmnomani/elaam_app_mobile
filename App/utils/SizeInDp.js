import Exception from './responsive/Exception';
import {RESPONSIVE_TYPE} from './responsive/RESPONSIVE_TYPE';
import {getDefaultSize, getResponsiveValue} from './responsive/SizeUtil';

const setOptions = options => {
  if (!options) {
    throw new Exception(
      'Responsive.setOptions() ERROR',
      '`options` is neccessary parameter, Not to be null or undefined.',
    );
  }
  if (typeof options.width !== 'number') {
    throw new Exception(
      'Responsive.setOptions() ERROR',
      '`width` property in `options` object is not number.',
    );
  }
  if (typeof options.height !== 'number') {
    throw new Exception(
      'Responsive.setOptions() ERROR',
      '`height` property in `options` object is not number.',
    );
  }
  if (typeof options.enableOnlySmallSize !== 'boolean') {
    throw new Exception(
      'Responsive.setOptions() ERROR',
      '`enableOnlySmallSize` property in `options` object is not boolean.',
    );
  }

  if (!this.defaultSize) {
    this.defaultSize = {};
  }

  this.defaultSize.width = options.width;
  this.defaultSize.height = options.height;
  this.enableOnlySmallSize = options.enableOnlySmallSize;
};

const width = val => {
  if (!this.defaultSize) {
    this.defaultSize = getDefaultSize();
  }

  const ratio = (val / this.defaultSize.width) * 100;
  const responsiveWidth = getResponsiveValue(RESPONSIVE_TYPE.WIDTH, ratio);

  if (this.enableOnlySmallSize && responsiveWidth > val) {
    return val;
  }

  return responsiveWidth;
};

const height = val => {
  if (!this.defaultSize) {
    this.defaultSize = getDefaultSize();
  }

  const ratio = (val / this.defaultSize.height) * 100;
  const responsiveHeight = getResponsiveValue(RESPONSIVE_TYPE.HEIGHT, ratio);

  if (this.enableOnlySmallSize && responsiveHeight > val) {
    return val;
  }

  return responsiveHeight;
};

const font = val => {
  if (!this.defaultSize) {
    this.defaultSize = getDefaultSize();
  }

  const ratio = (val / this.defaultSize.width) * 100;
  const responsiveFont = getResponsiveValue(RESPONSIVE_TYPE.FONT, ratio);

  if (this.enableOnlySmallSize && responsiveFont > val) {
    return val;
  }

  return responsiveFont;
};

const Responsive = {
  defaultSize: getDefaultSize(),
  enableOnlySmallSize: false,
  setOptions: setOptions,
  width: width,
  height: height,
  font: font,
};

export const dpWidth = size => Responsive.width(size); //PixelRatio.getPixelSizeForLayoutSize(size);
export const dpHeight = size => Responsive.height(size); //PixelRatio.getPixelSizeForLayoutSize(size);
export const dpFont = size => Responsive.font(size); //PixelRatio.getPixelSizeForLayoutSize(size);
