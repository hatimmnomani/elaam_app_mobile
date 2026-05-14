import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
const Scanner_icon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#b73109"
        d="M11.875 8.125v3.75h-3.75v-3.75h3.75ZM13.75 6.25h-7.5v7.5h7.5v-7.5Zm-1.875 11.875v3.75h-3.75v-3.75h3.75Zm1.875-1.875h-7.5v7.5h7.5v-7.5Zm8.125-8.125v3.75h-3.75v-3.75h3.75ZM23.75 6.25h-7.5v7.5h7.5v-7.5Zm-7.5 10h1.875v1.875H16.25V16.25Zm1.875 1.875H20V20h-1.875v-1.875ZM20 16.25h1.875v1.875H20V16.25ZM16.25 20h1.875v1.875H16.25V20Zm1.875 1.875H20v1.875h-1.875v-1.875ZM20 20h1.875v1.875H20V20Zm1.875-1.875h1.875V20h-1.875v-1.875Zm0 3.75h1.875v1.875h-1.875v-1.875ZM27.5 8.75H25V5h-3.75V2.5h6.25v6.25Zm0 18.75v-6.25H25V25h-3.75v2.5h6.25Zm-25 0h6.25V25H5v-3.75H2.5v6.25Zm0-25v6.25H5V5h3.75V2.5H2.5Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#b73109" d="M0 0h30v30H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Scanner_icon;
