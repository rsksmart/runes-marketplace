'use client'
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import TabsSection from "@/components/tabs";
import {
    ConnectWallet,
    useContract
} from "@thirdweb-dev/react";
import {
    AuctionListing,
    DirectListing,
} from "@thirdweb-dev/sdk";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ListingPage: NextPage = () => {
    // // Next JS Router hook to redirect to other pages and to grab the query from the URL (listingId)
    // const router = useRouter();

    // // De-construct listingId out of the router.query.
    // // This means that if the user visits /listing/0 then the listingId will be 0.
    // // If the user visits /listing/1 then the listingId will be 1.
    // // We do some weird TypeScript casting, because Next.JS thinks listingId can be an array for some reason.
    // const { listingId } = router.query as { listingId: string };

    // const { contract } = useContract('0x5849804F2F05e4097702D562695C238C32A76187', 'marketplace')

    // // Loading flag for the UI, so we can show a loading state while we wait for the data to load.
    // const [loadingListing, setLoadingListing] = useState(true);

    // // Store the bid amount the user entered into the bidding textbox
    // const [bidAmount, setBidAmount] = useState("");

    // // Storing this listing in a state variable so we can use it in the UI once it's fetched.
    // const [listing, setListing] = useState<AuctionListing | DirectListing>();


    // // When the component mounts, ask the marketplace for the listing with the given listingId
    // // Using the listingid from the URL (via router.query)
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

    // if (loadingListing) {
    //     return <div>Loading...</div>;
    // }

    // if (!listing) {
    //     return <div>Listing not found</div>;
    // }

    return (
       <div>

Listing!!
       </div>
        // <div>
            /* <img src={listing.asset.image!} />
            <h1>{listing.asset.name}</h1>
            <p>
                <b>Description:</b> {listing.asset.description}
            </p>
            <p>
                <b>Seller:</b> {listing.sellerAddress}
            </p>
            <p>
                <b>Listing Type:</b>{" "}
                {listing.type === 0 ? "Direct Listing" : "Auction Listing"}
            </p>

            <p>
                <b>Buyout Price</b> {listing.buyoutCurrencyValuePerToken.displayValue}{" "}
                {listing.buyoutCurrencyValuePerToken.symbol}
            </p>

            <div>
                <div>
                    <input
                        type="text"
                        placeholder="Enter bid amount"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                    />

                    <button>Make Bid</button>
                </div>

                <button>Buy Now</button>
            </div> */
        // </div>
    );
};

export default ListingPage;