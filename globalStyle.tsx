import { createGlobalStyle } from "styled-components";
import { Devices, Fonts } from "./src/common/Constant";

const GlobalStyle = createGlobalStyle`
.hideOnDesktop {
    display: none;
    @media ${Devices.max.tablet} {
      display: block;
    }
  }

.hideOnMobile {
    display: block;
    @media ${Devices.max.tablet} {
      display: none;
    }
  }

html,
body {
  padding: 0;
  margin: 0;
  font-family: ${Fonts.EpilogueRegular};
 
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

h1,h2,h3 {
  font-family: ${Fonts.EpilogueBold};
}

ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
`;

export default GlobalStyle;
