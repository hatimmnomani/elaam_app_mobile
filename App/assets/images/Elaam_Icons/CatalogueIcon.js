import * as React from 'react';
import Svg, {Defs, Image, Use} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const CatalogueIcon = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={25} height={30} {...props}>
    <Defs>
      <Image
        id="a"
        width={25}
        height={28}
        viewBox="0 0 25 28"
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAcCAMAAACj+uTiAAAAAXNSR0IB2cksfwAAAJBQTFRF/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm9/vm95hXllAAAADB0Uk5TAJcQQZoWImADCX76nFLf/7rU6l599RLo5r2w7Vv8Jmvvhf4BQmzk8TipDpL08s6Up921mgAAAK9JREFUeJyt0ucOgjAYheFPRh2MAy7KUqQKKAj3f3diMAoRAyG+P/ukKy1R3UwiWVGJKYxURSZJmS+WqyeQphsmLMOGbVgwDR3rzXbXCHoaln035yPUjY8S97W8S4A2Ujy/ySPfd0bu83vOlBNMuel/JKgLgaDVoZGeNzsOS9ReKTi9JQYX7b3PwIUER0wJ0kx05XrLUiSUA4Xf6g6EUQHkxMq+L4WSkWAV/xrnFRMPFCAhD3PZgO0AAAAASUVORK5CYII="
      />
    </Defs>
    <Use y={1} href="#a" />
  </Svg>
);
export default CatalogueIcon;
