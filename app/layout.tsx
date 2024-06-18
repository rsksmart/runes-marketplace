'use client'

import './globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { RootstockTestnet } from "@thirdweb-dev/chains";
import { TooltipProvider } from '@radix-ui/react-tooltip'

const activeChain = RootstockTestnet;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
    >
      <html lang="en">
        <body className='h-screen'>
          Page home
          <TooltipProvider>{children}</TooltipProvider>
          <ToastContainer />
        </body>
      </html>
    </ThirdwebProvider>
  )
}
