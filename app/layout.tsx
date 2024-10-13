"use client";
import "@/app/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  metamaskWallet,
  trustWallet,
  walletConnect,
  ThirdwebProvider as ThirdwebProviderV4 ,
  embeddedWallet,
} from "@thirdweb-dev/react";
import { ThirdwebProvider } from "thirdweb/react"; // v5
import { RootstockTestnet } from "@thirdweb-dev/chains";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { clientId } from "@/constants/index";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThirdwebProviderV4
      activeChain={RootstockTestnet}
      supportedWallets={[
        metamaskWallet(),
        trustWallet(),
        walletConnect(),
        embeddedWallet(),
      ]}
      clientId={clientId}
    >
      <ThirdwebProvider>
      <html lang="en">
        <body className="h-screen">
          <main className="flex relative h-full w-full flex-col items-center">
            <Navbar />
            <section className="mb-10 z-10 flex flex-1 w-full px-6 flex-col items-center">
              <div className="flex flex-row w-full justify-center items-center">
                <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-10 text-center text-black">
                  <span className="bg-title max-w-max px-1.5">
                    Runes Marketplace
                  </span>
                </h1>
              </div>
              <TooltipProvider>{children}</TooltipProvider>
              <ToastContainer />
            </section>
            <Footer />
          </main>
        </body>
      </html>
      </ThirdwebProvider>
    </ThirdwebProviderV4>
  );
}
