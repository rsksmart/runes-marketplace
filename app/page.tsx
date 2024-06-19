'use client'

import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/Navbar'
import TabsSection, { Tab } from '@/components/tabs'
import { ConnectWallet } from '@thirdweb-dev/react'
import satori from 'next/dist/compiled/@vercel/og/satori'
import { useSearchParams, useRouter } from 'next/navigation'

export default function Home() {
  const searchParams = useSearchParams();
  const activeTab: Tab = searchParams.get("active") as Tab;
  const router = useRouter()
  router.replace("/")

  return (
    <TabsSection activeTab={activeTab} />
  )
}
