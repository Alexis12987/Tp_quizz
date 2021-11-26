import * as React from "react";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { Colors, LanguageCode, Devices } from "../../common/Constant";
import { DropdownContent } from "../../types/CustomTypes";

interface IDropdownProps {
  onlyMobileIcon?: boolean;
}

const SCDropdownContentStyled = styled.div<IDropdownProps>`
  position: absolute;
  padding: 0;
  background-color: ${Colors.white};
  color: ${Colors.black};
  display: flex;
  z-index: 10;
  max-width: 120px;
  top: 100%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  max-height: 0px;
  transition: max-height 0.5s ease-in-out;
  overflow: hidden;

  left: 50%;
  transform: translateX(-50%);

  &.open {
    transition: max-height 0.5s ease-in-out;
    max-height: 200px;
    ul {
      display: block;
    }
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    padding: 10px;

    svg {
      margin-right: 10px;
    }

    ${(props) =>
      props.onlyMobileIcon
        ? `
          @media ${Devices.max.tablet} {
            span {
             display: none;
            }
            svg {
            margin:0;
            }
          } 
        `
        : ""}

    &:hover {
      background-color: ${Colors.greyPlatinum};
    }
  }
`;

const DropdownStyled = styled.div`
  margin: auto 0;
  position: relative;
  cursor: pointer;

  .wrapper {
    height: 100%;
    display: flex;
  }

  .dropdown-header {
    display: flex;
    align-items: center;
  }
`;

interface IDropdownProps {
  buttonHeader?: string | React.ReactNode;
  dropdownContent?: DropdownContent[];
  style?: Object;
  onClick?: (e?: any) => void;
  onlyIcon?: boolean;
}

const Dropdown: React.FunctionComponent<IDropdownProps> = ({
  buttonHeader,
  dropdownContent = [],
  style = {},
  onClick = () => {},
  onlyIcon = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);

  return (
    <DropdownStyled style={style}>
      <div className="wrapper" ref={ref}>
        <span className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
          {buttonHeader}
        </span>

        {dropdownContent && (
          <SCDropdownContentStyled
            onlyMobileIcon={onlyIcon}
            className={` ${isOpen ? "open" : ""}`}
          >
            <ul>
              {dropdownContent.map((content) => {
                return (
                  <li
                    key={content.code}
                    data-code={content.code}
                    onClick={(e) => {
                      onClick(e.currentTarget.getAttribute("data-code"));
                      setIsOpen(false);
                    }}
                    className="dropdown-item"
                  >
                    {content.icon}
                    <span>{content.value}</span>
                  </li>
                );
              })}
            </ul>
          </SCDropdownContentStyled>
        )}
      </div>
    </DropdownStyled>
  );
};

export default Dropdown;
