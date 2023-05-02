import { utils } from "ethers";
import { createContext, ReactNode, useContext, useState } from "react";
import {
  getLocalStorageTestnetFlag,
} from "../helpers";
import { useWalletConnectClient } from "./ClientContext";
import {
  DEFAULT_HEDERA_METHODS,
} from "../constants";
import { signatureVerify, cryptoWaitReady } from "@polkadot/util-crypto";


import {
  Signer,
  Client,
  TransactionId,
  TransferTransaction,
  Hbar,
  Transaction,
  PublicKey,
  SignerSignature
} from "@hashgraph/sdk";


/**
 * Types
 */
interface IFormattedRpcResponse {
  method?: string;
  address?: string;
  valid: boolean;
  result: string;
}

type TRpcRequestCallback = (chainId: string, address: string) => Promise<void>;

interface IContext {
  ping: () => Promise<void>;
  rpc: {
    testSignMessage: TRpcRequestCallback;
    testSignTransaction: TRpcRequestCallback;
  };
  rpcResult?: IFormattedRpcResponse | null;
  isRpcRequestPending: boolean;
}

/**
 * Context
 */
export const JsonRpcContext = createContext<IContext>({} as IContext);

/**
 * Provider
 */
export function JsonRpcContextProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<IFormattedRpcResponse | null>();

  const { client, session, accounts, balances } =
    useWalletConnectClient();

  const _createJsonRpcRequestHandler =
    (
      rpcRequest: (
        chainId: string,
        address: string
      ) => Promise<IFormattedRpcResponse>
    ) =>
      async (chainId: string, address: string) => {
        if (typeof client === "undefined") {
          throw new Error("WalletConnect is not initialized");
        }
        if (typeof session === "undefined") {
          throw new Error("Session is not connected");
        }

        try {
          setPending(true);
          const result = await rpcRequest(chainId, address);
          setResult(result);
        } catch (err: any) {
          console.error("RPC request failed: ", err);
          setResult({
            address,
            valid: false,
            result: err?.message ?? err,
          });
        } finally {
          setPending(false);
        }
      };

  const _verifyEip155MessageSignature = (
    message: string,
    signature: string,
    address: string
  ) =>
    utils.verifyMessage(message, signature).toLowerCase() ===
    address.toLowerCase();

  const ping = async () => {
    if (typeof client === "undefined") {
      throw new Error("WalletConnect is not initialized");
    }
    if (typeof session === "undefined") {
      throw new Error("Session is not connected");
    }

    try {
      setPending(true);

      let valid = false;

      try {
        await client.ping({ topic: session.topic });
        valid = true;
      } catch (e) {
        valid = false;
      }

      // display result
      setResult({
        method: "ping",
        valid,
        result: valid ? "Ping succeeded" : "Ping failed",
      });
    } catch (e) {
      console.error(e);
      setResult(null);
    } finally {
      setPending(false);
    }
  };

  const validHbar = (hbars: any) => {
    return typeof hbars == "number"
      ? new Hbar(hbars.toFixed(6))
      : new Hbar(Number(hbars).toFixed(6));
  };

  // -------- HEDERA RPC METHODS --------
  const rpc = {
    testSignTransaction: _createJsonRpcRequestHandler(
      async (
        chainId: string,
        address: string
      ): Promise<IFormattedRpcResponse> => {

        console.log('address', address)
        try {

          const hederClient = Client.forName("testnet");
          const hbarAmount = validHbar(9);
          let transId = TransactionId.generate(address);
          const trans = new TransferTransaction()
            .setMaxTransactionFee(new Hbar(5))
            .addHbarTransfer(address, hbarAmount.negated()) // Sending account
            .addHbarTransfer("0.0.8000", hbarAmount) // Receiving account
            .setTransactionMemo("HWC - trx Kabila")
            .setTransactionId(transId)
            .freezeWith(hederClient);

          const result = await client!.request<String>({
            chainId,
            topic: session!.topic,
            request: {
              method: DEFAULT_HEDERA_METHODS.SIGN_TRANSACTION,
              params: {
                accountId: address,
                executable: Buffer.from(trans.toBytes()).toString("base64")
              },
            },
          });
          console.log('result', result)
          const buffer = Buffer.from(result, "base64");

          // Convert the buffer back into a transaction object
          const transaction = Transaction.fromBytes(buffer);
          const result2 = await transaction.execute(hederClient);
          const receipt = await result2.getReceipt(hederClient);
          console.log("receipt", receipt);
          return {
            method: DEFAULT_HEDERA_METHODS.SIGN_TRANSACTION,
            address,
            valid: true,
            result: receipt.status.toString(),
          };
        } catch (error: any) {
          throw new Error(error);
        }
      }
    ),
    testSignMessage: _createJsonRpcRequestHandler(
      async (
        chainId: string,
        address: string
      ): Promise<IFormattedRpcResponse> => {
        const message = `This is an example message to be signed - ${Date.now()}`;
        const messages = [message];
        console.log('address', address)

        try {
          const result = await client!.request<SignerSignature[]>({
            chainId,
            topic: session!.topic,
            request: {
              method: DEFAULT_HEDERA_METHODS.SIGN,
              params: {
                accountId: address,
                messages: messages.map(message => Buffer.from(message).toString("base64")),
                signOptions: {}
              },
            },
          });

          console.log('result sign: ', result[0])
          console.log('result sign: ', typeof result[0])
          const publicKey = PublicKey.fromString("ecd3ce00ec6e94b44ce988c3b88889fa554094d5f74143e730b1797a88da1e31");
          const valid = publicKey.verify(Buffer.from(message, "base64"), result[0].signature);

          return {
            method: DEFAULT_HEDERA_METHODS.SIGN_TRANSACTION,
            address,
            valid,
            result: result[0].signature.toString(),
          };
        } catch (error: any) {
          throw new Error(error);
        }
      }
    ),
  };

  return (
    <JsonRpcContext.Provider
      value={{
        ping,
        rpc,
        rpcResult: result,
        isRpcRequestPending: pending,
      }}
    >
      {children}
    </JsonRpcContext.Provider>
  );
}

export function useJsonRpc() {
  const context = useContext(JsonRpcContext);
  if (context === undefined) {
    throw new Error("useJsonRpc must be used within a JsonRpcContextProvider");
  }
  return context;
}
