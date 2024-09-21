"use client";

import {
  useContract,
  useCreateDirectListing,
  Web3Button,
  useOwnedNFTs,
  useAddress,
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";
import { useState, useEffect, ChangeEvent } from "react";
import { Config } from "@/app/config";
import { connectWalletProps } from "@/constants";
import { Tab } from ".";

// Helper function to extract error message
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export default function SellTab({ setActiveTab }: { setActiveTab: (tab: Tab) => void }) {
  // Marketplace contract address from config
  const marketplaceContractAddress = Config.marketplaceContractAddress;

  // Get the marketplace contract instance
  const { contract: marketplaceContract } = useContract(
    marketplaceContractAddress,
    "marketplace-v3"
  );

  // Get the user's wallet address
  const address = useAddress();

  // State to manage form data
  const [formData, setFormData] = useState({
    address: "",
    tokenId: "",
    price: "",
  });

  // Get the nftContract based on the user's input
  const { contract: nftContract } = useContract(
    formData.address || undefined
  );

  // Fetch the owned NFTs using the nftContract and address
  const { data: ownedNFTs, isLoading: isNFTsLoading } = useOwnedNFTs(nftContract, address);

  // State for pagination
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mutation to create a direct listing on the marketplace
  const {
    mutateAsync: createDirectListing,
    isLoading: isListingLoading,
    error: listingError,
  } = useCreateDirectListing(marketplaceContract);

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Reset pagination when address changes
    if (name === "address") {
      setCurrentIndex(0);
    }
  };

  // Handle Next and Previous buttons for pagination
  const handleNext = () => {
    if (ownedNFTs && currentIndex < ownedNFTs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (ownedNFTs && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Set the selected tokenId when the NFT changes
  useEffect(() => {
    if (ownedNFTs && ownedNFTs.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        tokenId: ownedNFTs[currentIndex].metadata.id.toString(),
      }));
    }
  }, [ownedNFTs, currentIndex]);

  // Validate price input
  const isPriceValid = !isNaN(Number(formData.price)) && Number(formData.price) > 0;

  return (
    <Card>
      {/* Card Header */}
      <CardHeader>
        <CardTitle>Sell</CardTitle>
        <CardDescription>
          Upload your Rune to the marketplace!
        </CardDescription>
      </CardHeader>

      {/* Card Content */}
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side: Form Inputs */}
          <div className="flex-1">
            {/* Input for Rune Contract Address */}
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <label htmlFor="address" className="block text-gray-700 font-medium">
                  Rune Contract Address
                </label>
                <Tooltip>
                  <TooltipTrigger>
                    <CircleHelp className="w-4 h-4 text-gray-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter the address of the Rune contract.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-2 w-full px-3 py-2 border border-gray-400 rounded-md focus:border-gray-500 focus:outline-none bg-transparent text-gray-800"
              />
            </div>

            {/* Input for Sale Price */}
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <label htmlFor="price" className="block text-gray-700 font-medium">
                  Sale Price
                </label>
                <Tooltip>
                  <TooltipTrigger>
                    <CircleHelp className="w-4 h-4 text-gray-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter the sale price to sell your Rune.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-2 w-full px-3 py-2 border border-gray-400 rounded-md focus:border-gray-500 focus:outline-none bg-transparent text-gray-800"
                min="0"
                step="any"
              />
              {!isPriceValid && formData.price !== "" && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid price.</p>
              )}
            </div>

            {/* List Button */}
            <div className="mt-6">
              <Web3Button
                {...connectWalletProps}
                contractAddress={marketplaceContractAddress}
                action={async () => {
                  // Ensure all required fields are filled
                  if (!formData.address || !formData.tokenId || !formData.price) {
                    alert("Please fill in all the fields.");
                    return;
                  }

                  if (!isPriceValid) {
                    alert("Please enter a valid price.");
                    return;
                  }

                  if (!marketplaceContract) {
                    alert("Marketplace contract is not ready.");
                    return;
                  }

                  try {
                    // Create a direct listing
                    const listing = await createDirectListing({
                      assetContractAddress: formData.address, // Corrected to use the NFT contract address
                      tokenId: formData.tokenId, // Corrected syntax and using formData.tokenId
                      pricePerToken: formData.price,
                      currencyContractAddress: NATIVE_TOKEN_ADDRESS,
                      quantity: 1,
                      startTimestamp: new Date(),
                      endTimestamp: new Date(
                        new Date().getTime() + 7 * 24 * 60 * 60 * 1000
                      ),
                    });
                    console.log("Listing created:", listing);
                    alert("Listing created successfully!");
                    setActiveTab(Tab.BUY);
                  } catch (error) {
                    console.error("Error creating listing:", error);
                    alert("Failed to create listing.");
                  }
                }}
                isDisabled={isListingLoading || !isPriceValid}
              >
                {isListingLoading ? "Listing..." : "List"}
              </Web3Button>
            
            </div>
          </div>

          {/* Right Side: NFT Display */}
          {formData.address && (
            <div className="flex-1">
              {isNFTsLoading ? (
                // Loading state
                <p>Loading your Runes...</p>
              ) : ownedNFTs && ownedNFTs.length > 0 ? (
                <div>
                  {/* Display the current NFT */}
                  <div className="border border-gray-300 p-4 rounded-md">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">
                      {ownedNFTs[currentIndex].metadata.name ||
                        `Token ID: ${ownedNFTs[currentIndex].metadata.id}`}
                    </h3>
                    <ThirdwebNftMedia
                      metadata={ownedNFTs[currentIndex].metadata}
                      className="w-full h-auto mb-2"
                    />
                    {ownedNFTs[currentIndex].metadata.description && (
                      <p className="text-gray-700">
                        {ownedNFTs[currentIndex].metadata.description}
                      </p>
                    )}
                    <p className="text-gray-700">
                      <strong>Token ID:</strong>{" "}
                      {ownedNFTs[currentIndex].metadata.id.toString()}
                    </p>
                    <p className="text-gray-700">
                      <strong>Owner:</strong> {ownedNFTs[currentIndex].owner}
                    </p>
                  </div>

                  {/* Pagination Controls */}
                  {ownedNFTs.length > 1 && (
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={currentIndex === ownedNFTs.length - 1}
                        className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // No NFTs owned in this collection
                <p>You do not own any Runes in this collection.</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
