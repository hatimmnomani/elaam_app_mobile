import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {dpWidth} from '../../../utils/SizeInDp';

const Department_w = props => (
  <Svg
    width={dpWidth(23)}
    height={dpWidth(25)}
    viewBox="0 0 23 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M17.06 0v20H13.47v-4.09H8.53V20H4.938V0h12.123Zm-1.346 1.364h-2.245v2.272h2.245V1.364Zm-3.592 0H9.877v2.272h2.245V1.364Zm-3.592 0H6.285v2.272H8.53V1.364ZM15.714 5H13.47v2.273h2.245V5Zm-3.592 0H9.877v2.273h2.245V5ZM8.53 5H6.285v2.273H8.53V5ZM22 5.909v14.09h-4.49V5.91H22Zm-17.51 0v14.09H0V5.91h4.49Zm16.163 1.364h-1.796V9.09h1.796V7.273Zm-17.51 0H1.347V9.09h1.796V7.273Zm12.572 1.363H13.47v2.273h2.245V8.636Zm-3.592 0H9.878v2.273h2.245V8.636Zm-3.592 0H6.286v2.273h2.245V8.636Zm12.123 1.818h-1.796v1.819h1.796v-1.819Zm-17.51 0H1.346v1.819h1.796v-1.819Zm12.571 1.819H13.47v2.272h2.245v-2.272Zm-3.592 0H9.878v2.272h2.245v-2.272Zm-3.592 0H6.286v2.272h2.245v-2.272Zm12.123 1.363h-1.796v1.818h1.796v-1.818Zm-17.51 0H1.346v1.818h1.796v-1.818Zm17.51 3.182h-1.796v1.818h1.796v-1.818Zm-17.51 0H1.346v1.818h1.796v-1.818Z"
      fill="#fff"
    />
  </Svg>
);

export default Department_w;
