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
import { formatAddress } from "@/lib/utils";
import {
    MediaRenderer,
    useBuyDirectListing,
    useContract,
    useDirectListing,
    useSigner,
    Web3Button,
} from "@thirdweb-dev/react";
import { ChevronsLeft, Copy, Image } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Config } from '@/app/config';

const ListingPage = () => {
    const contractAddress = Config.marketplaceContractAddress;

    const { contract } = useContract(contractAddress, "marketplace-v3");

    const { listingId } = useParams() as unknown as { listingId: number };
    const { data: listing, isLoading: loadingListing } = useDirectListing(
        contract,
        listingId,
    );
    const { mutateAsync: buyDirectListing } = useBuyDirectListing(contract);
    const signer = useSigner();

    const [buyingInProgress, setBuyingInProgress] = useState(false);

    return (
        <Tabs className="flex w-full flex-col items-center" defaultValue="buy">
            <TabsList className="grid grid-cols-2 w-fit mb-1">
                <TabsTrigger value="buy">
                    <Link className="bold tracking-wide" href={`/?active=${Tab.BUY}`}>
                        Buy
                    </Link>
                </TabsTrigger>
                <TabsTrigger value="sell">
                    <Link className="bold tracking-wide" href={`/?active=${Tab.SELL}`}>
                        Sell
                    </Link>
                </TabsTrigger>
            </TabsList>
            <div className="w-full mx-10 justify-center flex">
                <TabsContent value="buy" className="w-[800px]">
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
                                        <ChevronsLeft className=""></ChevronsLeft>
                                        <span>All Runes</span>
                                    </Link>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {loadingListing ? (
                                <div>
                                    <div
                                        key="1"
                                        role="status"
                                        className="animate-pulse grid w-full grid-cols-2 gap-4 mt-3"
                                    >
                                        <div className="justify-center flex w-full">
                                            <div className="w-[200px] h-[200px] my-2 bg-border  rounded-lg items-center justify-center flex">
                                                <Image className="w-14 h-14 text-gray-200 "></Image>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="text-4xl mb-10 font-bold text-black ">
                                                <div className="h-14 w-60 bg-border  "></div>
                                            </div>
                                            <div className="h-4 w-48 my-2 bg-border  rounded-lg "></div>
                                            <div className="h-4 w-48 my-2 bg-border  rounded-lg "></div>
                                            <div className="h-4 w-48 my-2 bg-border  rounded-lg "></div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    key={listing!.id}
                                    className="grid w-full grid-cols-2 gap-4 mt-5"
                                >
                                    <div className="justify-center flex w-full">
                                        {listing!.asset.image ? (
                                            <MediaRenderer
                                                className="rounded-lg mb-2"
                                                width="200px"
                                                height="200px"
                                                src={listing!.asset.image}
                                            />
                                        ) : (
                                            <div className="w-[200px] h-[200px] my-2 bg-border  rounded-lg items-center justify-center flex">
                                                <Image className="w-14 h-14 text-gray-200 "></Image>
                                            </div>
                                        )}
                                    </div>
                                    <div className="">
                                        <div className="text-4xl mb-10 font-bold text-black ">
                                            <span className="bg-orange-400 px-1.5">
                                                {listing!.asset.name}
                                            </span>
                                        </div>

                                        <div className="flex flex-row items-center gap-4">
                                            <Label className="text-bold text-1xl w-32">Seller</Label>
                                            <div className="flex flex-row items-center gap-2 text-gray-400 hover:text-white cursor-pointer">
                                                <span>{formatAddress(listing!.creatorAddress)}</span>
                                                <Copy className="w-4"></Copy>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center gap-4">
                                            <Label className="text-bold text-1xl w-32">
                                                Rune Address
                                            </Label>
                                            <div className="flex flex-row items-center gap-2 text-gray-400 hover:text-white cursor-pointer">
                                                <span>
                                                    {formatAddress(listing!.assetContractAddress)}
                                                </span>
                                                <Copy className="w-4"></Copy>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center gap-4">
                                            <Label className="text-bold text-1xl w-32">Rune id</Label>
                                            <div>{listing!.asset.id}</div>
                                        </div>
                                        <div className="flex flex-row items-center gap-4">
                                            <Label className="text-bold text-1xl w-32">
                                                Buyout Price
                                            </Label>
                                            <div>
                                                {listing!.currencyValuePerToken.displayValue}{" "}
                                                {listing!.currencyValuePerToken.symbol}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="px-0 relative justify-end mb-6 mr-4">
                            {!buyingInProgress ? (
                                <Web3Button
                                    contractAddress={contractAddress}
                                    action={async () => {
                                        const buyerAddress = await signer?.getAddress();
                                        buyDirectListing({
                                            listingId: listingId.toString(), // ID of the listing to buy
                                            quantity: "1",
                                            buyer: buyerAddress!, // Wallet to buy for
                                        });
                                    }}
                                    onSubmit={() => {
                                        setBuyingInProgress(true);
                                    }}
                                    onError={(error) => alert("Something went wrong!")}
                                >
                                    Buy Now
                                </Web3Button>
                            ) : (
                                <Web3Button
                                    contractAddress={contractAddress}
                                    action={async () => { }}
                                    isDisabled={true}
                                    style={{ background: "#444" }}
                                >
                                    Buy Now
                                </Web3Button>
                            )}
                        </CardFooter>
                    </Card>
                </TabsContent>
            </div>
        </Tabs>
    );
};

export default ListingPage;
