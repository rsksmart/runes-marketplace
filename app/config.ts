import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

if (!clientId) {
  throw new Error("No client ID provided");
}

const marketplaceContractAddress = process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT;

if (!marketplaceContractAddress) {
  throw new Error("No marketplace contract address provided");
}

export const Config = {
  clientId: clientId,
  marketplaceContractAddress: marketplaceContractAddress,
};

export const thirdwebClient = createThirdwebClient({clientId: Config.clientId})
