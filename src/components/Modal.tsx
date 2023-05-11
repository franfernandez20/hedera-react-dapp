import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { fonts } from "../styles";
import Button from "./Button";
import { colors, transitions } from "../styles";


const SLightbox = styled.div<{
  show: boolean;
  offset: number;
  opacity?: number;
}>`
  display: flex;
  text-align: center;
  position: absolute;
  width:55%;
  height:65%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  will-change: opacity;
  background-color: ${({ opacity }) => {
    let alpha = 0.4;
    if (typeof opacity === "number") {
      alpha = opacity;
    }
    return `rgba(72,61,139, ${alpha})`;
  }};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  pointer-events: ${({ show }) => (show ? "auto" : "none")};
  justify-content: center;
  align-items: center;
`;

const SModalContainer = styled.div`
  position: relative;
  z-index: 2;
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SHitbox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

interface CloseButtonStyleProps {
  size: number;
  color: string;
  onClick?: any;
}
 const SXButton = styled(Button as any)`
  border-radius: 10px;
  background:#483D8B;
  font-size: ${fonts.size.medium};
  height: 44px;
  width: 100%;
`;

const SCloseButton = styled.div<CloseButtonStyleProps>`
  position: absolute;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  right: ${({ size }) => `${size / 1.6667}px`};
  top: ${({ size }) => `${size / 1.6667}px`};
  opacity: 0.5;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  &:before,
  &:after {
    position: absolute;
    content: " ";
    height: ${({ size }) => `${size}px`};
    width: 2px;
    background: rgb(12, 12, 13)};
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

const SCard = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  padding: 25px;
  background-color: rgb(255, 255, 255);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SModalContent = styled.div`
  position: relative;
  width: 100%;
  position: relative;
  word-wrap: break-word;
`;

interface IProps {
  children: React.ReactNode;
  show: boolean;
  closeModal: () => void;
  opacity?: number;
}

export default function Modal({ children, show, opacity, closeModal }: IProps) {
  const [offset, setOffset] = useState(0);
  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lightboxRef.current) {
      const lightboxRect = lightboxRef.current.getBoundingClientRect();
      const nextOffset = lightboxRect.top > 0 ? lightboxRect.top : 1;
      if (nextOffset !== 0 && nextOffset !== offset) {
        setOffset(nextOffset);
      }
    }
  }, [offset]);

  return (
    <SLightbox show={show} offset={offset} opacity={0.9} ref={lightboxRef}> 
      <SModalContainer>
      <SHitbox onClick={closeModal} />
        <SCard>
        <SXButton onClick={closeModal}>Close</SXButton>
        <SModalContent>{children}</SModalContent>
        </SCard>
      </SModalContainer>
    </SLightbox>
  );
}
