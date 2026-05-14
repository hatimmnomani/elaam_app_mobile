import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const Filter = props => (
  <Svg
    width={17}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M.121.474c-.177.298-.152.646.025.944l.026.025 6.135 8.421v9.515c0 .248.152.472.355.571.076.05.177.05.279.05a.63.63 0 0 0 .406-.149l3.118-2.559a.607.607 0 0 0 .228-.472V9.865l6.135-8.422.026-.025c.177-.298.202-.645.025-.944a.952.952 0 0 0-.837-.472H.932a.867.867 0 0 0-.81.472Z"
      fill="#B83409"
    />
  </Svg>
);

export default Filter;
