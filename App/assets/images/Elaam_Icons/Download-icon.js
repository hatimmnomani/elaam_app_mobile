import * as React from 'react';
import Svg, {Path, LinearGradient, Stop} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}>
    <Path fill="none" d="M0 0h24v24H0z" />
    <LinearGradient
      id="a"
      gradientUnits="userSpaceOnUse"
      x1={3.636}
      y1={19.53}
      x2={20.363}
      y2={4.469}>
      <Stop
        offset={0.182}
        style={{
          stopColor: '#f0c457',
        }}
      />
      <Stop
        offset={1}
        style={{
          stopColor: '#a98920',
        }}
      />
    </LinearGradient>
    <Path
      fill="url(#a)"
      d="M12 .75C5.779.75.75 5.778.75 12S5.779 23.25 12 23.25 23.25 18.222 23.25 12 18.221.75 12 .75zM12 21c-4.972 0-9-4.027-9-9 0-4.972 4.028-9 9-9 4.973 0 9 4.028 9 9 0 4.973-4.027 9-9 9z"
    />
    <LinearGradient
      id="b"
      gradientUnits="userSpaceOnUse"
      x1={12.001}
      y1={16.223}
      x2={12.001}
      y2={7.778}>
      <Stop
        offset={0.37}
        style={{
          stopColor: '#f0c457',
        }}
      />
      <Stop
        offset={1}
        style={{
          stopColor: '#a98920',
        }}
      />
    </LinearGradient>
    <Path
      fill="url(#b)"
      d="M15.167 13.584v1.583H8.833v-1.583H7.777v1.583c0 .58.475 1.056 1.056 1.056h6.334a1.06 1.06 0 0 0 1.056-1.056v-1.583h-1.056zm-.528-2.112-.744-.744-1.367 1.361V7.777h-1.055v4.312l-1.367-1.361-.744.744L12 14.111l2.639-2.639z"
    />
  </Svg>
);

export default SvgComponent;
