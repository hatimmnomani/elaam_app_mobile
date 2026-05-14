import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const NotificationIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}>
    <Path
      fillRule="evenodd"
      d="M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm10-2v1H4v-1l2-2v-5c0-3.1 1.6-5.6 4.5-6.3V4c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v.7c2.9.7 4.5 3.2 4.5 6.3v5zm-4-7c0-2.5-1.5-4.5-4-4.5s-4 2-4 4.5v6h8z"
      style={{
        fill: '#fef9bd',
      }}
    />
  </Svg>
);
export default NotificationIcon;
