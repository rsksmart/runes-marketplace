"use client";

import { Tab } from "@/components/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { copyToClipboard, formatAddress } from "@/lib/utils";
import {
  MediaRenderer,
  useBuyDirectListing,
  useCancelDirectListing,
  useContract,
  useDirectListing,
  useSigner,
  Web3Button,
} from "@thirdweb-dev/react";
import { Check, ChevronsLeft, Copy, Image } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { connectWalletProps, marketplaceContractAddress } from "@/constants";
import { useActiveAccount } from "thirdweb/react";

const ListingPage = () => {

  const wallet = useActiveAccount();

  
  
  const marketPlace = marketplaceContractAddress;
  
  const { contract: marketPlaceContract } = useContract(marketPlace, "marketplace-v3");
  
  
  const { listingId } = useParams() as unknown as { listingId: number };
  const { data: listing, isLoading: loadingListing } = useDirectListing(
    marketPlaceContract,
    listingId
  );
  const { mutateAsync: buyDirectListing } = useBuyDirectListing(marketPlaceContract);

  const {
    mutateAsync: cancelDirectListing,
  } = useCancelDirectListing(marketPlaceContract);
  
  const signer = useSigner();
  const router = useRouter();
  const [buyingInProgress, setBuyingInProgress] = useState(false);
  
  const [contractAddressCopied, setContractAddressCopied] = useState(false);
  const [creatorAddressCopied, setCreatorAddressCopied] = useState(false);

  const creatorAddress: string | undefined = listing?.creatorAddress;
  const assetContractAddress: string | undefined =
  listing?.assetContractAddress;



  useEffect(() => {
    if (contractAddressCopied) {
      const timer = setTimeout(() => {
        setContractAddressCopied(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [contractAddressCopied]);

  useEffect(() => {
    if (creatorAddressCopied) {
      const timer = setTimeout(() => {
        setCreatorAddressCopied(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [creatorAddressCopied]);

  return (
    <Tabs className="flex w-full flex-col items-center" defaultValue="buy">
      <TabsList className="grid grid-cols-2 w-fit mb-1">
        <TabsTrigger value="buy">
          <Link
            className="font-bold tracking-wide"
            href={`/?active=${Tab.BUY}`}
          >
            Buy
          </Link>
        </TabsTrigger>
        <TabsTrigger value="sell">
          <Link
            className="font-bold tracking-wide"
            href={`/?active=${Tab.SELL}`}
          >
            Sell
          </Link>
        </TabsTrigger>
      </TabsList>
      <div className="w-full mx-4 md:mx-10 justify-center flex">
        <TabsContent value="buy" className="w-full max-w-[900px]">
          <Card>
            <CardHeader>
              <div className="grid w-full grid-cols-2 gap-4">
                <div>
                  <CardTitle>Buy</CardTitle>
                  <CardDescription>Buy this Rune!</CardDescription>
                </div>
                <div className="flex justify-end items-center hover:text-pink-400 mr-2">
                  <Link
                    className="flex items-center"
                    href={`/?active=${Tab.BUY}`}
                  >
                    <ChevronsLeft className="mr-1" />
                    <span>All Runes</span>
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loadingListing ? (
                <div className="animate-pulse grid w-full grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div className="flex justify-center w-full">
                    <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-border rounded-lg flex items-center justify-center">
                      <Image className="w-14 h-14 text-gray-200" />
                    </div>
                  </div>
                  <div className="">
                    <div className="text-2xl md:text-4xl font-bold mb-10 text-black">
                      <div className="h-14 w-60 bg-border rounded-lg"></div>
                    </div>
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="h-4 w-48 my-2 bg-border rounded-lg"
                      ></div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                  <div className="flex justify-center w-full">
                    {listing?.asset.image ? (
                      <MediaRenderer
                        className="rounded-lg"
                        width="100%"
                        height="auto"
                        src={listing.asset.image}
                      />
                    ) : (
                      <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-border rounded-lg flex items-center justify-center">
                        <Image className="w-14 h-14 text-gray-200" />
                      </div>
                    )}
                  </div>
                  <div className="">
                    <div className="text-2xl md:text-4xl font-bold mb-10 text-black">
                      <span className="bg-orange-400 px-1.5">
                        {listing?.asset.name}
                      </span>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                      <Label className="font-bold text-lg md:w-32">
                        Seller
                      </Label>
                      <div className="flex flex-row items-center gap-2">
                        {formatAddress(creatorAddress!)}
                        <Tooltip>
                          <TooltipTrigger>
                            {creatorAddressCopied ? (
                              <Check className="w-4 text-green-500" />
                            ) : (
                              <Copy
                                onClick={() => {
                                  copyToClipboard(creatorAddress!);
                                  setCreatorAddressCopied(true);
                                }}
                                className="w-4 text-gray-400 hover:text-white cursor-pointer"
                              />
                            )}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-[200px]">
                              {creatorAddressCopied
                                ? "Address copied!"
                                : "Copy Address"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                      <Label className="font-bold text-lg md:w-32">
                        Rune Address
                      </Label>
                      <div className="flex flex-row items-center gap-2">
                        {formatAddress(assetContractAddress!)}
                        <Tooltip>
                          <TooltipTrigger>
                            {contractAddressCopied ? (
                              <Check className="w-4 text-green-500" />
                            ) : (
                              <Copy
                                onClick={() => {
                                  copyToClipboard(assetContractAddress!);
                                  setContractAddressCopied(true);
                                }}
                                className="w-4 text-gray-400 hover:text-white cursor-pointer"
                              />
                            )}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-[200px]">
                              {contractAddressCopied
                                ? "Address copied!"
                                : "Copy Address"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                      <Label className="font-bold text-lg md:w-32">
                        Rune Id
                      </Label>
                      <div>{listing?.asset.id}</div>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                      <Label className="font-bold text-lg md:w-32">
                        Buyout Price
                      </Label>
                      <div>
                        {listing?.currencyValuePerToken.displayValue}{" "}
                        {listing?.currencyValuePerToken.symbol}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="px-0 justify-end mb-6 mr-4">
              {wallet?.address !== creatorAddress ?
                <Web3Button
                  connectWallet={{ ...connectWalletProps }}
                  contractAddress={marketPlace as `0x${string}`}
                  action={async () => {
                    const buyerAddress = await signer?.getAddress();
                    await buyDirectListing({
                      listingId: listingId.toString(), // ID of the listing to buy
                      quantity: "1",
                      buyer: buyerAddress!, // Wallet to buy for
                    })
                  }}
                  onSuccess={()=>router.push('/')}
                >
                  Buy Now
                </Web3Button> : <Web3Button
                  connectWallet={{ ...connectWalletProps }}
                  contractAddress={marketPlace as `0x${string}`}
                  action={async () => { await cancelDirectListing(BigInt(listingId)).finally(() => router.push('/')) }}
                  style={{ color: "white", backgroundColor: 'red' }}
                  onSuccess={async () => {router.push('/') }}
                >
                  Cancel listing
                </Web3Button>}
            </CardFooter>
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ListingPage;
