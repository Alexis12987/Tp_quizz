import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  DotGroup,
  ImageWithZoom,
  Slide,
  Slider,
} from "pure-react-carousel";
import * as React from "react";
import styled from "styled-components";
import { Colors } from "../../common/Constant";
import { OeuvreType } from "../../types/StrapiTypes";
import IconArrowLeft from "../icons/IconArrowLeft";
import IconArrowRight from "../icons/IconArrowRight";

const SliderContainerStyled = styled.div`
  position: relative;
  .carousel-button-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
  }
  .carousel-button-back {
    left: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  button {
    background-color: inherit;
    border: none;
  }

  .carousel__dot-group {
    text-align: center;
    display: flex;
    button {
      width: 100%;
      border: 1px black solid;
      height: 12px;

      &:disabled {
        background-color: black;
      }
      background-color: white;
      border: 1px black solid;
      margin-top: 5px;
      margin-bottom: 5px;
      &:not(:last-child) {
        margin-right: 5px;
      }
    }
  }
`;
interface ISliderContainerProps {
  oeuvre: OeuvreType;
}

const SliderContainer: React.FunctionComponent<ISliderContainerProps> = ({
  oeuvre,
}) => {
  return (
    <SliderContainerStyled>
      {oeuvre?.images && (
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={125}
          totalSlides={oeuvre.images.length}
        >
          <div className="carousel-container">
            <Slider>
              {oeuvre.images.map((img) => {
                return (
                  <Slide index={0} key={img.hash}>
                    <ImageWithZoom
                      key={img.hash}
                      src={process.env.STRAPI_URL + img.url}
                    ></ImageWithZoom>
                  </Slide>
                );
              })}
            </Slider>
            {oeuvre.images.length > 1 && (
              <>
                <ButtonBack className="carousel-button-back">
                  <IconArrowLeft width={24} height={24} fill={Colors.white} />
                </ButtonBack>
                <ButtonNext className="carousel-button-next">
                  <IconArrowRight width={24} height={24} fill={Colors.white} />
                </ButtonNext>
                <DotGroup />
              </>
            )}
          </div>
        </CarouselProvider>
      )}
    </SliderContainerStyled>
  );
};

export default SliderContainer;
