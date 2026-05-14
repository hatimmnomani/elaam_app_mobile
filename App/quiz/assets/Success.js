import * as React from 'react';
import Svg, { Path, Defs, Pattern, Use, Image } from 'react-native-svg';
const Success = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={126}
    height={133}
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d="M33 22h68v58H33z" />
    <Path fill="url(#b)" d="M0 0h126v133H0z" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#c" transform="matrix(.00546 0 0 .0064 0 -.003)" />
      </Pattern>
      <Pattern
        id="b"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#d" transform="matrix(.00336 0 0 .00318 0 0)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALcAAACdBAMAAAAEd/T8AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAbUExURQAAAAC/YACxUQCwUACvUACwUACxUAC1VQCxUZX5GroAAAAJdFJOUwAI5/9w348Y904MWRoAAAAJcEhZcwAAFxEAABcRAcom8z8AAAKiSURBVGjetdZBahwxEIVhGYKzDbmB8Q0ypskykAsEfAFBLpBl9lnMtT3utNutVklVrvdeHeBffCBVldLP18vH59uXEpufifjlR6x995iJP8TinzLty1MsniEPo6fIg+g58iB6jjyIniMPoifJQ+hZ8hB6ljyEniUPoafJA+h58gB6njyAnicPoAPkLjpC7qIj5C46Qu6iQ+QOOkbuoGPkDjpG7qCD5FN0lHyKjpJP0VHyKTpMPkHHySfoOPkEHSefoBPIh+gM8iE6g3yIziAfolPIB+gc8gE6h3yAziEfoJPITXQWuYnOIjfRWeQmOo3cQOeRG+g8cgOdR26gE8k7dCZ5h84k79CZ5B06lfyEziU/oXPJT+hc8hM6mbxBZ5M36GzyBp1N3qDTyQ/ofPIDOp/8gM4nP6ALyHd0BfmOriDf0RXkO7qEfEPXkG/oGvINXUO+oYvIV3QV+YquIl/RVeQruoz8Ff1ZF/9VfuvitfyVtb//Kfey+FLK53+q+PX2QmXo9RZXod/Iiwx9ef0VVejXdROJ0Osa16Cv5Cr05f/216Bft4tLgl63uAJ9I9egL29XrgL9jVyCXvc4H30nV6Dv5Ar0d3IBej3E2egHcj76gZyPfiSno9cmzkVvyNnoDTkbvSUno9dTnIl+Iuein8i56GdyKnrt4jz0jpyJ3pEz0XtyIno14ix0g5yHbpDz0C1yGno14xx0k5yFbpKz0G1yEnodxBnoA3IO+oCcgz4ip6DXYRxHH5Iz0IfkDPQxOQG9TuIo+oQcR5+Q4+gzchi9TuMY+pQcRZ+So+hzchC9OnEE3SHH0B1yDN0jh9A9cgTdJUfQXXIE3ScH0H3yPHqAPI8eIM+jR8jT6BHyLHqIPIseIs+ix8iT6DHyHLpJ/gLmIvqSBH4kmAAAAABJRU5ErkJggg=="
        id="c"
        width={183}
        height={157}
        preserveAspectRatio="none"
      />
      <Image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASoAAAE7CAMAAABdbjwjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABjUExURQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGZodN4AAAAhdFJOUwBwIDDH/78Ih3hI5/cYr++PWN/PtxCflyiAUGBop9dAOILOQaoAAAAJcEhZcwAAFxEAABcRAcom8z8AAAOLSURBVHhe7d3LVtswEADQkkSYkgQoEGihLfz/V/Y4jh1p/Cic7qp7l0xWc6zR6GHz5QsAAAAAAAAAAAAAAAAAAAAAAAAAAADA/+tiFf/CpPUmXca/MaG5Simlr/HPjFxv20yl3ToGKO1vjolKabOPIQoXt6dM3cUIhf3mlKjdtxiicN0/Uvfq1KLm7pSo9KCpWrTqB196PMQYuW/94EtPTYyRaZ77RKXnGCP3/WHI1I8YI/eyGzJlObPoYkhUeo0xcucyJVOLDo8y9TGrc0GXqUXrbsNFpv4qm/rSzxgkk019+qlF2dSnR1/0lGXqKQbJ5Jl6tEKe1/zKMvUgU/OarPFM9/an5hWZurXnOe9wmWXKed+CQ7aYSek6hhmUmbqIYQZlprSe88pMXWoTZjV5RdcmLCi6hHT7PcYZ5D26yW9Jvu5zOrPkR5Gpmxhm8LXI1G+T36zXIlNWfvNeikwp6fPeshMHW+lLVsOdoCO30mcdfheZ2ro9PKto0lN6i3F6wy3PjkI162eZKYVqVpj8FKpZYfJTqGaFyU+hmhcmv6oL1fvb0nIuTH71FqrV3f3xUXmPgV5Y+VVbqNbDVt1u5spdLOlX8QeVKPafJnPVDO/NdCrdoxre3TuZeoOv3PZMaXac/teGd/d6u3Fxfws/qbNPeC078NYm/mafXR9u1XmNqtz8PYnXD4rT0VqvvJQHCr1d2TPFH9U5/F5CC35SHFe9hyFa5/BrExFWdp1siB2OvelZncPvqClPijuP53h+Kb1V9VFyrEWtlz4Y+4TR9FiXsLnZ6vcNmjA+d7XfeTl+Eah0qkgxUvXwO+o/dXPWTYLrMPtVuvbLHUI/3j9WYXno1H2ienf3YPOX11quB7ViT9C27Ksw/EIXX6t93GBIV3E3XU0/iYMtbeNSWk0/iR3UmJreiwcNkZp+VrzeMKKmZ5YfKzU9t/RYbdX0XJzycj40UWjGy5veQ/xt7Ua91WDYv6JzGJ90dTxUI+G6y8BDNbKPOep4qCaM9/haHqoJ430rS5o5U21ovSd/iybaUA/VtGa0xfdonTwj9Au3k7f4aK2LTPnHDkuywr6z87LofCy/qf3U/W+GhWCtF64/ofsyx7bOW8Sfc91m6sYHcT5iW+t9z8973lkff9C7RR8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwL/5AyfrM6QV9ukpAAAAAElFTkSuQmCC"
        id="d"
        width={298}
        height={315}
        preserveAspectRatio="none"
      />
    </Defs>
  </Svg>
);
export default Success;
