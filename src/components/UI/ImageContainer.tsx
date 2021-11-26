import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { DefaultImagePath } from "../../common/Constant";
import Image from "next/image";

const ImageContainerStyled = styled.img`
  width: 100%;
  height: 100%;
`;

interface IImageContainerProps {
  src: string;
  fallback?: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
}

const ImageContainer: React.FunctionComponent<IImageContainerProps> = ({
  src,
  fallback = DefaultImagePath,
  width = 500,
  height = 500,
  alt = "alt",
}) => {
  const [imgSrc, setImgSrc] = useState(false);
  const [oldSrc, setOldSrc] = useState(src);
  if (oldSrc !== src) {
    setImgSrc(false);
    setOldSrc(src);
  }
  return (
    <Image
      className="image"
      layout="responsive"
      width={width}
      height={height}
      src={imgSrc ? fallback : src}
      onError={() => {
        setImgSrc(true);
      }}
      alt={alt}
    />
  );
};

export default ImageContainer;
