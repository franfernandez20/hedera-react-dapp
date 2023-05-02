export interface AssetData {
  symbol: string;
  name: string;
  contractAddress?: string;
  balance?: string;
}
export interface MethodArgument {
  type: string;
}
export interface Method {
  signature: string;
  name: string;
  args: MethodArgument[];
}
export interface AccountAction {
  method: string;
  callback: (chainId: string, address: string) => Promise<void>;
}

export interface AccountBalances {
  [account: string]: AssetData[];
}
