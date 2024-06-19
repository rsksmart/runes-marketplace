'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    ConnectWallet,
    useContract
} from "@thirdweb-dev/react";
import {
    AuctionListing,
    DirectListing,
} from "@thirdweb-dev/sdk";
import { Copy, Image } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ListingPage = () => {
    const router = useRouter();
    const { listingId } = useParams();

    // const { contract } = useContract('0x5849804F2F05e4097702D562695C238C32A76187', 'marketplace')

    // Loading flag for the UI, so we can show a loading state while we wait for the data to load.
    const [loadingListing, setLoadingListing] = useState(true);
    const [buyingInProgress, setBuyingInProgress] = useState(false)

    // Store the bid amount the user entered into the bidding textbox
    // const [bidAmount, setBidAmount] = useState("");

    // Storing this listing in a state variable so we can use it in the UI once it's fetched.
    const [listing, setListing] = useState<AuctionListing | DirectListing>();


    // When the component mounts, ask the marketplace for the listing with the given listingId
    // Using the listingid from the URL (via router.query)
    // useEffect(() => {
    //     if (!listingId || !contract) {
    //         return;
    //     }
    //     (async () => {
    //         // Pass the listingId into the getListing function to get the listing with the given listingId
    //         const listing = await contract.getListing(listingId);

    //         // Update state accordingly
    //         setLoadingListing(false);
    //         setListing(listing);
    //     })();
    // }, [listingId, contract]);


    // if (!listing) {
    //     return <div>Listing not found</div>;
    // }

    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prevProgress => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    setListing({
                        id: "1",
                        assetContractAddress: "0x0000000000000000000000000000000001000008",
                        tokenId: 1,
                        sellerAddress: "0x0000000000000000000000000000000001000008",
                        asset: {
                            id: "2",
                            name: "runestocks",
                            image: `https://picsum.photos//200?random=${2}`
                        },
                        buyoutCurrencyValuePerToken: {
                            displayValue: "0.023",
                            symbol: "tRBTC"
                        },
                        type: 1
                    } as AuctionListing);
                    setLoadingListing(false);
                    return 100;
                }
                return prevProgress + 10; // Increase progress by 10% every second
            });

        }, 100); // Update every

        return () => {
            clearInterval(interval);
        };
    });

    function handleBuyRune() {
        setBuyingInProgress(true)
        alert("buying")
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (buyingInProgress) {
                setBuyingInProgress(false)
            }
        }, 5000); // Update every 5s

        return () => {
            clearInterval(interval);
        };
    });

    async function buyRune() {
        try {
            // Ensure user is on the correct network
            //   if (networkMismatch) {
            //     switchNetwork && switchNetwork(4);
            //     return;
            //   }

            // Simple one-liner for buying the NFT
            //   await marketplace?.buyoutListing(listingId, 1);
            alert("NFT bought successfully!");
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    function styleAddress(_address: string) {
        return _address.substring(0, 4) + "..." + _address.substring(_address.length - 4);
    }

    return (
        <Tabs
            className="flex w-full flex-col items-center"
            defaultValue="buy"
        >
            <TabsList className="grid grid-cols-2 w-fit mb-1">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="sell">
                    <Link className="bold tracking-wide" href={`/?active=sell`}>
                        Sell
                    </Link>
                </TabsTrigger>
            </TabsList>
            <div className='w-full mx-10 justify-center flex'>
                <TabsContent value="buy" className='w-[800px]'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Buy</CardTitle>
                            <CardDescription>Buy this Rune!</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {
                                loadingListing ? (
                                    <div>
                                        <Progress value={progress} className="h-2" />
                                        <div key='1' role="status" className="animate-pulse grid w-full grid-cols-2 gap-4 mt-5">
                                            <div className="justify-center flex w-full">
                                                <div className="w-[200px] h-[200px] my-2 bg-gray-200 rounded-lg dark:bg-gray-700 items-center justify-center flex">
                                                    <Image className="w-14 h-14 text-white dark:text-gray-100"></Image>
                                                </div>
                                            </div>
                                            <div className="">

                                                <div className="text-4xl mb-10 font-bold text-black ">
                                                    <div className="h-14 w-60 bg-gray-200 dark:bg-gray-700"></div>
                                                </div>
                                                <div className="h-4 w-48 my-2 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
                                                <div className="h-4 w-48 my-2 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
                                                <div className="h-4 w-48 my-2 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
                                                
                                            </div>
                                        </div>
                                    </div>

                                ) : (
                                    <div
                                        key={listing!.id}
                                        className="grid w-full grid-cols-2 gap-4 mt-5"
                                    >
                                        <div className="justify-center flex w-full">
                                            <img className='rounded-lg' src={listing!.asset.image!}></img>
                                        </div>
                                        <div className="">
                                            <div className="text-4xl mb-10 font-bold text-black ">
                                                <span className="bg-orange-400 px-1.5">{listing!.asset.name}</span>
                                            </div>

                                            <div className="flex flex-row items-center gap-4">
                                                <Label className="text-bold text-1xl w-24">Seller</Label>
                                                <div className="flex flex-row items-center gap-2 text-gray-400 hover:text-white">
                                                    <span>
                                                        {styleAddress(listing!.sellerAddress)}
                                                    </span>
                                                    <Copy className="w-4"></Copy>
                                                </div>
                                            </div>
                                            <div className="flex flex-row items-center gap-4">
                                                <Label className="text-bold text-1xl w-24">Listing Type</Label>
                                                <div className="text-pink-400">
                                                    {listing!.type === 0 ? "Direct Listing" : "Auction Listing"}
                                                </div>
                                            </div>
                                            <div className="flex flex-row items-center gap-4">
                                                <Label className="text-bold text-1xl w-24">Buyout Price</Label>
                                                <div>
                                                    {listing!.buyoutCurrencyValuePerToken.displayValue}{" "}
                                                    {listing!.buyoutCurrencyValuePerToken.symbol}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </CardContent>
                        <CardFooter className="px-0 relative z-0 justify-end mb-6 mr-4">
                            <Button
                                className="mt-5 mr-2 px-14 bg-white text-black"
                                type="submit"
                                variant={'outline'}
                                disabled={buyingInProgress || loadingListing}
                                size={'sm'}
                                onClick={handleBuyRune}
                            >
                                Buy Now
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </div>
        </Tabs >
    )
};

export default ListingPage;