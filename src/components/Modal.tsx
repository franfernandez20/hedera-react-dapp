import React, { useEffect, useRef, useState } from "react";
import {
  SLightbox,
  SModalContainer,
  SCard,
  SXButton,
  SModalContent,
  SLanding,
  SButtonContainer

} from "../components/app";
import Icon from "./Icon";

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
      <SLanding center>
        <SLightbox show={show} offset={offset} opacity={1} ref={lightboxRef}>
        <SModalContainer>
            <SCard>
            {show && <button  className="btnClose" onClick={closeModal}>
              <Icon size={30} src={"/assets/close.png"} />
            </button>}
              {/* {show && <button className="btnClose" onClick={closeModal}>Close</button>} */}
            <SModalContent>{children}</SModalContent>
            </SCard>
          </SModalContainer>
        </SLightbox>
      </SLanding>
  );
}
