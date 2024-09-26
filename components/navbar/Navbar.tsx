import logo from "@/app/assets/img/logo.svg";
import { connectWalletProps } from "@/constants";
import { ConnectWallet } from "@thirdweb-dev/react";

function Navbar() {
  return (
    <nav className="w-full py-4 px-6 flex justify-between">
      <img src={logo.src} alt="logo" />
      <ConnectWallet {...connectWalletProps} />
    </nav>
  );
}

export default Navbar;
