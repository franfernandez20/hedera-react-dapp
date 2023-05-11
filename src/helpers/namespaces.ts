import { ProposalTypes } from "@walletconnect/types";
import { LedgerId } from "@hashgraph/sdk";

const chainsMap = new Map();
chainsMap.set(LedgerId.MAINNET.toString(), 295);
chainsMap.set(LedgerId.TESTNET.toString(), 296);
chainsMap.set(LedgerId.PREVIEWNET.toString(), 297);

const chainsNames: {
  [key: string]: string
} = {
  295: "Mainnet (295)",
  296: "Testnet (296)",
  297: "Previewnet (297)",
}

export enum METHODS {
  SIGN_TRANSACTION = "signTransaction",
  CALL = "call",
  GET_ACCOUNT_BALANCE = "getAccountBalance",
  GET_ACCOUNT_INFO = "getAccountInfo",
  GET_LEDGER_ID = "getLedgerId",
  GET_ACCOUNT_ID = "getAccountId",
  GET_ACCOUNT_KEY = "getAccountKey",
  GET_NETWORK = "getNetwork",
  GET_MIRROR_NETWORK = "getMirrorNetwork",
  SIGN = "sign",
  GET_ACCOUNT_RECORDS = "getAccountRecords",
  CHECK_TRANSACTION = "checkTransaction",
  POPULATE_TRANSACTION = "populateTransaction"
}

export enum EVENTS {
  ACCOUNTS_CHANGED = "accountsChanged",
}

export const getChainByLedgerId = (ledgerId: LedgerId): string => {
  return `hedera:${chainsMap.get(ledgerId.toString())}`;
}

export const getNameByChainId = (chainId: string): string => {
  const ledgerId = chainId.split(":")[1];
  return chainsNames[ledgerId];
}

export const getLedgerIdByChainId = (chainId: string): LedgerId => {
  const name = getNameByChainId(chainId);
  return LedgerId.fromString(name);
}

export const getRequiredNamespaces = (ledgerId: LedgerId): ProposalTypes.RequiredNamespaces => {
  return {
    hedera: {
      chains: [getChainByLedgerId(ledgerId)],
      methods: Object.values(METHODS),
      events: Object.values(EVENTS),
    }
  };
};
