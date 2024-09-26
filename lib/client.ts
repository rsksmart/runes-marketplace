import { clientId, secretKey } from "@/constants";
import { createThirdwebClient } from "thirdweb";

const clientOptions = secretKey 
  ? { secretKey } 
  : clientId 
    ? { clientId } 
    : { secretKey: "" }; 

const client = createThirdwebClient(clientOptions);

export default client;
