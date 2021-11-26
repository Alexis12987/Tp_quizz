import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import * as React from "react";
import styled from "styled-components";
import { Colors, Devices, Routes } from "../../common/Constant";
import { useAppContext } from "../../context/AppContext";
import IconCross from "../icons/IconCross";
interface IMobileMenuStyleddProps {
  open: boolean;
}

const MobileMenuStyled = styled.div<IMobileMenuStyleddProps>`
  display: none;
  @media ${Devices.max.tablet} {
    display: block;
    height: 100vh;
    width: 70vh;
    z-index: 25;
    background-color: ${Colors.white};
    left: 0;
    position: absolute;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
    transition: transform 0.3s ease-in-out;

    svg {
      cursor: pointer;
      float: right;
    }
  }
`;

const SCMobileMenuShadowStyled = styled.div<IMobileMenuStyleddProps>`
  display: none;
  @media ${Devices.max.tablet} {
    display: block;
    height: 100vh;
    width: 100vw;
    z-index: 20;
    background-color: ${Colors.black};
    opacity: 0.6;
    left: 0;
    top: 0;
    position: absolute;
    display: ${({ open }) => (open ? "block" : "none")};
  }
`;

const SCMobileMenuContentStyled = styled.div`
  padding: 20px;
  height: 100%;
  color: ${Colors.black};

  .menu-navigation {
    li {
      margin: 15px 0;
    }
  }
`;

interface IMobileMenuProps {
  open: boolean;
}

const MobileMenu: React.FunctionComponent<IMobileMenuProps> = ({ open }) => {
  const { toggleMobileMenu, isLogged } = useAppContext();
  const { locale } = useRouter();

  return (
    <>
      <MobileMenuStyled open={open} className={`  ${open ? "open" : ""}`}>
        <SCMobileMenuContentStyled>
          <IconCross width={24} height={24} onClick={toggleMobileMenu} />
          <h1 onClick={toggleMobileMenu}>
            <Link href={Routes.Home}>Titre</Link>
          </h1>
          <ul className="menu-navigation">
            <li onClick={toggleMobileMenu} className="item-navigation">
              <Link href={Routes.game}>{"game"}</Link>
            </li>
            {isLogged && (
              <li onClick={toggleMobileMenu} className="item-navigation">
                <Link href={Routes.scores}>{"scores"}</Link>
              </li>
            )}

            <li onClick={toggleMobileMenu} className="item-navigation">
              <Link href={Routes.login}>{"login"}</Link>
            </li>
          </ul>
        </SCMobileMenuContentStyled>
      </MobileMenuStyled>
      <SCMobileMenuShadowStyled
        className={""}
        onClick={toggleMobileMenu}
        open={open}
      />
    </>
  );
};

export default MobileMenu;
