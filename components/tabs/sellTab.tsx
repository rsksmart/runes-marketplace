'use client'

import { useNetwork, useNetworkMismatch } from "@thirdweb-dev/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { CircleHelp } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { formSchema } from "@/app/utils/schemas";
import { Input } from "../ui/input";
import { Label } from "../ui/label";


export default function SellTab(): JSX.Element {
    const [loading, setLoading] = useState(false)

    // Next JS Router hook to redirect to other pages
    const router = useRouter();

    // Connect to our marketplace contract via the useContract hook and pass the marketplace contract address
    //  const { contract } = useContract("0x5849804F2F05e4097702D562695C238C32A76187", "marketplace")
    const networkMismatch = useNetworkMismatch();
    const [, switchNetwork] = useNetwork();

    // This function gets called when the form is submitted.
    // The user has provided:
    // - contract address
    // - token id
    // - type of listing (either auction or direct)
    // - price of the NFT
    // This function gets called when the form is submitted.
    async function handleCreateListing(e: any) {
        try {
            setLoading(true)
            // Ensure user is on the correct network
            if (networkMismatch) {
                switchNetwork && switchNetwork(4); // 4 is goerli here
                setLoading(false)
                return;
            }

            // Prevent page from refreshing
            e.preventDefault();

            // Store the result of either the direct listing creation or the auction listing creation
            let transactionResult = undefined;

            // De-construct data from form submission
            console.log(e.target.elements)
            const { listingType, address, tokenId, price } = e.target.elements;

            // Depending on the type of listing selected, call the appropriate function
            // For Direct Listings:
            if (listingType.value === "directListing") {
                transactionResult = await createDirectListing(
                    address.value,
                    tokenId.value,
                    price.value,
                );
            }

            // For Auction Listings:
            if (listingType.value === "auctionListing") {
                transactionResult = await createAuctionListing(
                    address.value,
                    tokenId.value,
                    price.value,
                );
            }

            // If the transaction succeeds, take the user back to the homepage to view their listing!
            // if (transactionResult) {
            //     router.push(`/`);
            // }
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    }


    async function createAuctionListing(
        contractAddress: string,
        tokenId: string,
        price: string,
    ) {
        try {
            // const transaction = await contract?.auction.createListing({
            //     assetContractAddress: contractAddress, // Contract Address of the NFT
            //     buyoutPricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
            //     currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
            //     listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
            //     quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
            //     reservePricePerToken: 0, // Minimum price, users cannot bid below this amount
            //     startTimestamp: new Date(), // When the listing will start
            //     tokenId: tokenId, // Token ID of the NFT.
            // });

            // return transaction;
        } catch (error) {
            console.error(error);
        }
    }

    async function createDirectListing(
        contractAddress: string,
        tokenId: string,
        price: string,
    ) {
        try {
            // const transaction = await contract?.direct.createListing({
            //     assetContractAddress: contractAddress, // Contract Address of the NFT
            //     buyoutPricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
            //     currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
            //     listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
            //     quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
            //     startTimestamp: new Date(0), // When the listing will start
            //     tokenId: tokenId, // Token ID of the NFT.
            // });

            // return transaction;
        } catch (error) {
            console.error(error);
        }
    }

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            listing_type: 'directListing',
            price: 0,
            token_id: 0,
            address: '',
        },
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sell</CardTitle>
                <CardDescription>Upload your NFT to the marketplace!</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={handleCreateListing} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="listingType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-1">
                                        Listing Type
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <CircleHelp className="w-4 h-4" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="max-w-[200px]">
                                                    Select the listing type that you want.
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </FormLabel>
                                    <FormControl>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="flex flex-row items-center gap-2">
                                                <Input className="h-4 w-4 accent-[#ee5be2]"
                                                    {...field}
                                                    id="directListing"
                                                    name="listingType"
                                                    value="directListing"
                                                    type="radio"
                                                />
                                                <Label >
                                                    Direct Listing
                                                </Label>
                                            </div>
                                            <div className="flex flex-row items-center gap-2">
                                                <Input className="h-4 w-4 accent-[#ee5be2]"
                                                    {...field}
                                                    id="auctionListing"
                                                    name="listingType"
                                                    value="auctionListing"
                                                    type="radio"
                                                />
                                                <Label >
                                                    Auction Listing
                                                </Label>
                                            </div>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-1">
                                        Price
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <CircleHelp className="w-4 h-4" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="max-w-[200px]">
                                                    Enter the sale price to sell your NFT.
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter rune price"
                                            id="price"
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.price?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tokenId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-1">
                                        Token Id
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <CircleHelp className="w-4 h-4" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="max-w-[200px]">
                                                    The actual token id in the collection.
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter token id"
                                            id="tolenId"
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.token_id?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-1">
                                        NFT Contract Address
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <CircleHelp className="w-4 h-4" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="max-w-[200px]">
                                                    Enter the address the NFT Contract Address
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="0x..."
                                            id="address"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.address?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <CardFooter className="px-0 relative z-0 justify-end">
                            <Button
                                className="mt-5 mr-2 px-14 bg-white text-black"
                                type="submit"
                                variant={'outline'}
                                disabled={loading}
                                size={'sm'}
                            >
                                {loading ? 'Listing' : 'List NFT'}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card >
    )
}