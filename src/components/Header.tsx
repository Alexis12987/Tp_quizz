import * as React from "react";
import styled from "styled-components";
import {
  Colors,
  Devices,
  Fonts,
  LanguageInfos,
  Routes,
} from "../common/Constant";
import { useAppContext } from "../context/AppContext";
import IconFranceFlag from "../components/icons/IconFranceFlag";
import IconUkFlag from "../components/icons/IconUkFlag";
import HeaderLinkStyled from "../components/UI/HeaderLink";
import Dropdown from "./UI/Dropdown";
import IconGlobeAmericas from "../components/icons/IconGlobeAmericas";
import { useRouter } from "next/dist/client/router";
import BurgerButton from "./UI/BurgerButton";
import { LanguageCode } from "../common/Constant";
import { Component } from "react";
import MobileMenu from "./navigation/MobileMenu";
import Contact from "../../pages/login";
import { Link } from "@mui/material";
import { userService } from "../services/userService";

const HeaderStyled = styled.div`
  background-color: #ebfdfc;
  width: 100%;
  padding: 0;
  color: ${Colors.black};
  font-family: ${Fonts.EpilogueRegular};

  display: flex;
  height: 60px;
  padding: 0 5em;

  @media ${Devices.max.tablet} {
    padding: 0 2em;
  }

  .dropdown-header {
    padding: 5px;
    box-sizing: border-box;
    border-radius: 6px;
    &:hover {
      background-color: ${Colors.lightDark};
    }
  }
`;

const SCRightHeader = styled.div`
  margin-left: auto;
`;
interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const { isLogged, toggleMobileMenu, mobileMenuStatus } = useAppContext();

  return (
    <HeaderStyled>
      <BurgerButton
        onClick={() => toggleMobileMenu()}
        className="hideOnDesktop"
      ></BurgerButton>

      <HeaderLinkStyled
        className={"nav-link hideOnMobile"}
        text={"Home"}
        url={Routes.Home}
      ></HeaderLinkStyled>
      <HeaderLinkStyled
        className={"nav-link hideOnMobile"}
        text={"Game"}
        url={Routes.game}
      ></HeaderLinkStyled>

      {isLogged && (
        <>
          <HeaderLinkStyled
            className={"nav-link hideOnMobile"}
            text={"Scores"}
            url={Routes.scores}
          ></HeaderLinkStyled>
          <HeaderLinkStyled
            className={"nav-link hideOnMobile"}
            text={"Logout"}
            url={Routes.login}
            onClick={() => {
              userService.logout();
            }}
          ></HeaderLinkStyled>
        </>
      )}
      <SCRightHeader>
        <HeaderLinkStyled
          className={"nav-link hideOnMobile"}
          text={"Login"}
          url={Routes.login}
        ></HeaderLinkStyled>
      </SCRightHeader>

      <MobileMenu open={mobileMenuStatus}></MobileMenu>
    </HeaderStyled>
  );
};

export default Header;
