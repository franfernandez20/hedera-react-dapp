import React, { PropsWithChildren, FC } from "react";
import styled from "styled-components";

import Asset from "./Asset";
import Button from "./Button";
import Column from "./Column";
import Loader from "./Loader";

import {
  AccountAction,
  AccountBalances,
  getNameAndID
} from "../helpers";
import { fonts } from "../styles";

interface AccountStyleProps {
  rgb: string;
}

const SAccount = styled.div<AccountStyleProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 10px;
  padding: 8px;
  margin: 5px 0;
  background: 	#CBC6E6;
  border: ${({ rgb }) => `2px solid rgb(${rgb})`};
  &.active {
    box-shadow: ${({ rgb }) => `0 0 10px rgb(${rgb})`};
  }
`;

const SChain = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  text-align:center;
  font-size:16px;
  font-weight: 600;
`;

const SContainer = styled.div`
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  word-break: break-word;
`;

const SFullWidthContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const SAction = styled(Button as any)`
  border-radius: 8px;
  font-size: ${fonts.size.medium};
  height: 44px;
  width: 100%;
  margin: 12px 0;
  background-color: ${({ rgb }) => `rgb(${rgb})`};
`;

const SBlockchainChildrenContainer = styled(SFullWidthContainer)`
  flex-direction: column;
`;

interface BlockchainProps {
  fetching?: boolean;
  active?: boolean;
  chainId: string;
  address?: string;
  onClick?: (chain: string) => void;
  balances?: AccountBalances;
  actions?: AccountAction[];
}

const Blockchain: FC<PropsWithChildren<BlockchainProps>> = (
  props: PropsWithChildren<BlockchainProps>
) => {
  const {
    fetching,
    chainId,
    address,
    onClick,
    active,
    balances,
    actions,
  } = props;

  const account =
    typeof address !== "undefined" ? `${chainId}:${address}` : undefined;
  const assets =
    typeof account !== "undefined" && typeof balances !== "undefined"
      ? balances[account]
      : [];
  return (
    <React.Fragment>
      <SAccount
        rgb="72,61,139"
        onClick={() => onClick && onClick(chainId)}
        className={active ? "active" : ""}
      >
        <SChain>
          <p>{getNameAndID(chainId)}</p>
        </SChain>
        {!!address && <p>{address}</p>}
        <SBlockchainChildrenContainer>
          {fetching ? (
            <Column center>
              <SContainer>
                <Loader rgb={`rgb("218, 104, 167")`} />
              </SContainer>
            </Column>
          ) : (
            <>
              {!!assets && assets.length ? (
                <SFullWidthContainer>
                  <h6>Balances</h6>
                  <Column center>
                    {assets.map((asset) =>
                      asset.symbol ? (
                        <Asset key={asset.symbol} asset={asset} />
                      ) : null
                    )}
                  </Column>
                </SFullWidthContainer>
              ) : null}
              {address && !!actions && actions.length ? (
                <SFullWidthContainer>
                  <h6>Methods</h6>
                  {actions.map((action) => (
                    <SAction
                      key={action.method}
                      left
                      rgb="218, 104, 167"
                      onClick={() => action.callback(chainId, address)}
                    >
                      {action.method}
                    </SAction>
                  ))}
                </SFullWidthContainer>
              ) : null}
            </>
          )}
        </SBlockchainChildrenContainer>
      </SAccount>
    </React.Fragment>
  );
};
export default Blockchain;
