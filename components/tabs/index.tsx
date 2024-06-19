import { TabsTrigger, TabsList, Tabs, TabsContent } from '@/components/ui/tabs'
import BuyTab from '@/components/tabs/buyTab'
import SellTab from '@/components/tabs/sellTab'

export default function TabsSection() {
  return (
    <Tabs
      className="flex w-full flex-col items-center"
      defaultValue="buy"
    >
      <TabsList className="grid grid-cols-2 w-fit mb-1">
        <TabsTrigger value="buy">Buy</TabsTrigger>
        <TabsTrigger value="sell">Sell</TabsTrigger>
      </TabsList>
      <div className='w-full mx-10 justify-center flex'>
        <TabsContent value="buy" className='w-full'>
          <BuyTab />
        </TabsContent>
        <TabsContent value="sell" className='w-[600px] '>
          <SellTab />
        </TabsContent>
      </div>
    </Tabs>
  )
}
