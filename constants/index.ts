import { ConnectWalletProps } from "@thirdweb-dev/react";

export const connectWalletProps: ConnectWalletProps = {
  modalTitle: "Connect your wallet",
  modalTitleIconUrl: "",
  hideTestnetFaucet: false,
  hideSendButton: true,
  hideReceiveButton: true,
  hideBuyButton: true,
  modalSize: "compact",
};

export const marketplaceContractAddress = process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT;

if (!marketplaceContractAddress) {
  throw new Error("No marketplace contract address provided");
}

export const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

export const secretKey = process.env.TW_SECRET_KEY;

if (!clientId) {
  throw new Error("Client ID not set");
}
