import logo from "@/app/assets/img/logo.svg";
import client from "@/lib/client";
import { ConnectButton } from "thirdweb/react";
import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";

const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "email",
        "passkey",
        "phone",
        //"farcaster"
      ],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
];
function Navbar() {
  return (
    <nav className="w-full py-4 px-6 flex justify-between">
      <img src={logo.src} alt="logo" />
      <ConnectButton 
      client={client}  
      wallets={wallets}
      connectModal={{ size: "compact" }} />
    </nav>
  );
}

export default Navbar;
