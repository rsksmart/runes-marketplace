'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import generateNFTs from "./mock_generator"
import { MediaRenderer } from "@thirdweb-dev/react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Image, CircleHelp } from "lucide-react";
import { NFT } from "@/constants/NFT";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BuyTab(): JSX.Element {
    // const { contract } = useContract('0x5849804F2F05e4097702D562695C238C32A76187', 'marketplace')
    // const { data: listings, isLoading: loadingListings } = useActiveListings(contract);
    const router = useRouter();

    var listings = new Array<NFT>();
    listings = generateNFTs(19);

    const [progress, setProgress] = useState(0)
    const [loadingListings, setLoadingListings] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prevProgress => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    setLoadingListings(false);
                    return 100;
                }
                return prevProgress + 10; // Increase progress by 10% every second
            });

        }, 200); // Update every

        return () => {
            clearInterval(interval);
        };
    });

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Buy</CardTitle>
                <CardDescription>Buy a Rune!</CardDescription>
            </CardHeader>
            <CardContent>
                <div className={loadingListings ? 'block' : 'hidden'}>
                    <Progress value={progress} />
                    <div role="status" className="animate-pulse grid w-full md:grid-cols-5 xl:grid-cols-8 sm:grid-cols-2 gap-4 mt-5">
                        {[...Array(16)].map(() => (
                            <div className=""> 
                            {/* add key */}
                                <div className="max-w-200 max-h-200">
                                    <div className="w-[200px] h-[200px] my-2 bg-gray-200 rounded-lg dark:bg-gray-700 items-center justify-center flex">
                                        <Image className="w-14 h-14 text-white dark:text-gray-100"></Image>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="h-[10px] my-2 bg-gray-200 rounded-lg dark:bg-gray-700 max-w-[150px]"></div>
                                    <div className="h-[10px] my-2 bg-gray-200 rounded-lg dark:bg-gray-700 max-w-[80px]"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={loadingListings ? 'hidden' : 'block'}>
                    <div className="grid w-full md:grid-cols-5 xl:grid-cols-8 sm:grid-cols-2 gap-4">
                        {listings?.map((listing) => (
                            <div
                                key={listing.id}
                                className="hover:text-purple-400 hover:text-bold px-4"
                                onClick={() => router.push(`/listings/${listing.id}`)}
                            >
                                <Link href={`/listings/${listing.id}`}>
                                    <img className='rounded-lg mb-2' src={listing.asset.image}></img>
                                </Link>
                                {/* Use with the data provided by the contract 
                            <MediaRenderer width="200" height="200" src={listing.asset.image} /> */}

                                <div className="flex flex-col items-start">
                                    <Link className="bold tracking-wide" href={`/listing/${listing.id}`}>
                                        {listing.asset.name}
                                    </Link>
                                    <div className="flex flex-row items-center">
                                        <p >
                                            {listing.buyoutCurrencyValuePerToken.displayValue}{" "}
                                            {listing.buyoutCurrencyValuePerToken.symbol}
                                        </p>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <CircleHelp className="w-6 h-6 pl-2" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="max-w-[200px]">
                                                    Gas costs are not included
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}