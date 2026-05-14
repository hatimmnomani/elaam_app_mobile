import * as React from 'react';
import Svg, {Defs, Image, Use} from 'react-native-svg';
import {dpWidth} from '../../../utils/SizeInDp';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const NiyatDownload = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={dpWidth(14)}
    height={dpWidth(14)}
    viewBox="0 0 48 48"
    {...props}>
    <Defs>
      <Image
        id="a"
        width={32}
        height={32}
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAAXNSR0IB2cksfwAAAC1QTFRFVzgCVzgCVzgCVzgCVzgCVzgCVzgCVzgCVzgCVzgCVzgCVzgCVzgCVzgCVzgCssEauQAAAA90Uk5TAP92NH/vNTbwN+WlG+zm1XexAQAAAIRJREFUeJxjYIAAQUEGVDBEBJQhAkYwPotoAkiALdABKuAoGAYSSBUUgQuIFggKsgfCBVgEBTsFBWcICsK0AJVICAo2whWAlYAAXAFICRAgFECVICkAK0FWAFYCUwD1hKMIjAcVYHFAE0CoJ0NgoSAKkGLYiCogzXAWVeAOA88+ZP7rAwCsaRb7+mYsNwAAAABJRU5ErkJggg=="
      />
    </Defs>
    <Use x={8} y={8} href="#a" />
  </Svg>
);
export default NiyatDownload;
