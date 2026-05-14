import * as React from 'react';
import Svg, {G, Circle, Path, Defs} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const Uparrow = props => (
  <Svg
    width={120}
    height={120}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G filter="url(#a)">
      <Circle cx={52} cy={52} r={30} fill="#B83409" />
      <Circle cx={52} cy={52} r={30.5} stroke="#fff" />
    </G>
    <Path
      d="m52.763 41.269 6.803 5.75c.52.476.569 1.239.17 1.74-.4.5-1.208.583-1.695.173l-4.84-4.095v17.93c0 .681-.538 1.233-1.2 1.233-.664 0-1.201-.551-1.201-1.232v-17.93l-4.84 4.094c-.488.41-1.284.317-1.695-.173-.424-.507-.319-1.33.169-1.74l6.803-5.75c.513-.374 1.03-.343 1.526 0Z"
      fill="#fff"
    />
    <Defs />
  </Svg>
);

export default Uparrow;
