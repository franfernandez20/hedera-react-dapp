import * as React from "react";
import styled from "styled-components";

import { PairingTypes } from "@walletconnect/types";

import Peer from "./Peer";

interface PairingProps {
  pairing: PairingTypes.Struct;
  onClick?: any;
}

const SPairingContainer = styled.div`
  width: 100%;
  cursor: pointer;
`;

const Pairing = (props: PairingProps) => {
  const { peerMetadata } = props.pairing;
  return (
      <button className="btnPairing" onClick={props.onClick}>
        {typeof peerMetadata !== "undefined" ? (
          // <Peer oneLiner metadata={peerMetadata} />
          <p>{peerMetadata.name}</p>
        ) : (
          <div>{`Unknown Wallet`}</div>
        )}
      </button>
  );
};

export default Pairing;
