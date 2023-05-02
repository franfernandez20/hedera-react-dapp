if (!process.env.NEXT_PUBLIC_PROJECT_ID)
  throw new Error("`NEXT_PUBLIC_PROJECT_ID` env variable is missing.");

export const DEFAULT_CHAINS = ["hedera:295", "hedera:296", "hedera:297"];

export const DEFAULT_PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID || "ce06497abf4102004138a10edd29c921";
export const DEFAULT_RELAY_URL = process.env.NEXT_PUBLIC_RELAY_URL || "wss://relay.walletconnect.com";

export const DEFAULT_LOGGER = "debug";

export const DEFAULT_APP_METADATA = {
  name: "React App",
  description: "React App for WalletConnect",
  url: "https://walletconnect.com/",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export enum DEFAULT_HEDERA_METHODS {
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
export enum DEFAULT_HEDERA_EVENTS {
  ACCOUNTS_CHANGED = "accountsChanged"
}

type RelayerType = {
  value: string | undefined;
  label: string;
};


// Investigate if can be used to set up regionalized relayer endpoints
export const REGIONALIZED_RELAYER_ENDPOINTS: RelayerType[] = [
  {
    value: DEFAULT_RELAY_URL,
    label: "Default",
  },

  {
    value: "wss://us-east-1.relay.walletconnect.com",
    label: "US",
  },
  {
    value: "wss://eu-central-1.relay.walletconnect.com",
    label: "EU",
  },
  {
    value: "wss://ap-southeast-1.relay.walletconnect.com",
    label: "Asia Pacific",
  },
];
