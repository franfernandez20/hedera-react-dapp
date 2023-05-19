import styled from "styled-components";
import { fonts } from "../../styles";
import Button from "../Button";
import Column from "../Column";
import Wrapper from "../Wrapper";

export const SLayout = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  text-align: center;
`;
export const SSelect= styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 0 0 10px;
  & img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
`;
export const SContent = styled(Wrapper as any)`
  width: 100%;
  height: 100%;
  padding: 0 16px;
`;

export const SLanding = styled(Column as any)`
  /* height: 600px; */
  color:DarkSlateBlue;
`;

export const SButtonContainer = styled(Column as any)`

  width: 250px;
  margin: 50px 0;
  
`;

export const SConnectButton = styled(Button as any)`
  border-radius: 10px;
  background:#483D8B;
  font-size: ${fonts.size.medium};
  height: 44px;
  width: 100%;
  margin: 12px 0;
`;

export const SAccountsContainer = styled(SLanding as any)`
  
width: 250px;
  margin: 50px 0;
`;

export const SToggleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  & > p {
    margin-right: 10px;
  }
`;

export const SFullWidthContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const SAccounts = styled(SFullWidthContainer)`
  justify-content: space-between;
  & > div {
    margin: 12px 0;
    flex: 1 0 100%;
    @media (min-width: 648px) {
      flex: 0 1 48%;
    }
  }
`;

export const SLightbox = styled.div<{
  show: boolean;
  offset: number;
  opacity?: number;
}>`
  margin-top:25px;
  display: flex;
  text-align: center;
  position: absolute;
  width: 400px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  will-change: opacity;
  border-radius: 10px;
  background-color: ${({ opacity }) => {
    let alpha = 0.4;
    if (typeof opacity === "number") {
      alpha = opacity;
    }
    return `rgba(77,166,198, ${alpha})`;
  }};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  pointer-events: ${({ show }) => (show ? "auto" : "none")};
  justify-content: center;
  align-items: center;
`;

export const SModalContainer = styled.div`
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

export const SHitbox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export interface CloseButtonStyleProps {
  size: number;
  color: string;
  onClick?: any;
}
 export const SXButton = styled.div`
  border-radius: 10px;
  background:#483D8B;
  height: 30px;
  width: 25%;
`;

export const SCloseButton = styled.div<CloseButtonStyleProps>`
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

export const SCard = styled.div`
  
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

export const SModalContent = styled.div`
  position: relative;
  width: 100%;
  position: relative;
  word-wrap: break-word;
`;
