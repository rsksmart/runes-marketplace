'use client'

import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/Navbar'
import TabsSection from '@/components/tabs'
import { ConnectWallet } from '@thirdweb-dev/react'

export default function Home() {
  return (
    <main className="flex relative h-full w-full flex-col items-center">
      <Navbar />
      <section className="mb-10 z-10 flex flex-1 w-full px-6 flex-col items-center">
        <div className='flex flex-row w-full justify-between items-center'>
        <div className='w-40'>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-10 text-center text-black">
            <span className='bg-title max-w-max px-1.5'>Runes Marketplace</span>
          </h1>
          <div className='flex w-40 justify-end'>
            <ConnectWallet />
          </div>
        </div>
        <TabsSection />
      </section>
      <Footer />
    </main>
  )
}
