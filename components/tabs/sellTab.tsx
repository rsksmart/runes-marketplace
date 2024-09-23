"use client";

import {
  useContract,
  useOwnedNFTs,
  useAddress,
  ThirdwebNftMedia,
  useContractRead,
  useContractWrite,
  Web3Button,
  useCreateDirectListing,
} from "@thirdweb-dev/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";
import { useState, useEffect, ChangeEvent } from "react";
import { connectWalletProps, marketplaceContractAddress } from "@/constants";
import { Tab } from ".";
import { formatAddress, toastStyle } from "@/lib/utils";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { toast } from "react-hot-toast";
import { TransactionButton } from "thirdweb/react";

export default function SellTab({
  setActiveTab,
}: {
  setActiveTab: (tab: Tab) => void;
}) {
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

  const [inputChanged, setInputChanged] = useState(false);

  // Get the nftContract based on the user's input
  const { contract: nftContract } = useContract(
    formData.address,
    "edition" // Specify the contract type
  );

  // Fetch the owned NFTs using the nftContract and address
  const { data: ownedNFTs, isLoading: isNFTsLoading } = useOwnedNFTs(
    nftContract,
    address
  );

  // State for pagination
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Reset pagination when address changes
    if (name === "address") {
      if (value !== "") {
        setInputChanged(true);
      }
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

  // Use useContractRead to call 'isApprovedForAll'
  const {
    data: hasApproval,
    isLoading: isFetching,
    isFetched,
  } = useContractRead(nftContract, "isApprovedForAll", [
    address,
    marketplaceContract?.getAddress(),
  ]);

  // Use useContractWrite to set approval for all
  const { mutateAsync: setApprovalForAll, isLoading: isApproving } =
    useContractWrite(nftContract, "setApprovalForAll");

  // Function to handle approval
  const handleSetApprovalForAll = async () => {
    try {
      const transactionResult = await setApprovalForAll({
        args: [marketplaceContract?.getAddress(), true],
      });
      console.log("setApprovalForAll transaction result:", transactionResult);
      // Optionally, refetch the approval status after setting approval
    } catch (error) {
      console.error("Error setting approval:", error);
    }
  };

  // function create DirectListing
  const { mutateAsync: createDirectListing } =
    useCreateDirectListing(marketplaceContract);

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
  const isPriceValid =
    !isNaN(Number(formData.price)) && Number(formData.price) > 0;

  return (
    <Card>
      {/* Card Header */}
      <CardHeader>
        <CardTitle>Sell</CardTitle>
        <CardDescription>Upload your Rune to the marketplace!</CardDescription>
      </CardHeader>

      {/* Card Content */}
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side: Form Inputs */}
          <div className="flex-1">
            {/* Input for Rune Contract Address */}
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="address"
                  className="block text-gray-300 font-medium"
                >
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
                className="mt-2 w-full px-3 py-2 border border-gray-400 rounded-md focus:border-gray-500 focus:outline-none bg-transparent text-gray-200"
              />
            </div>

            {/* Input for Sale Price */}
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="price"
                  className="block text-gray-300 font-medium"
                >
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
                className="mt-2 w-full px-3 py-2 border border-gray-400 rounded-md focus:border-gray-500 focus:outline-none bg-transparent text-gray-200"
                min="0"
                step="any"
              />
              {!isPriceValid && formData.price !== "" && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a valid price.
                </p>
              )}
            </div>

            {/* Approval Status */}
            <div className="mb-6">
              {isFetching && inputChanged ? (
                <p className="text-gray-300">Checking approval status...</p>
              ) : null}

              {isFetched && hasApproval ? (
                <p
                  className="text-green-600 relative group flex items-center"
                  title="The marketplace contract has been approved to handle the assets"
                >
                  Marketplace approved.
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="absolute hidden group-hover:block bg-gray-700 text-white text-xs rounded p-1 mt-2 left-0">
                    The marketplace contract has been approved to handle the
                    assets
                  </span>
                </p>
              ) : null}

              {isFetched && !hasApproval ? (
                <div>
                  <p className="text-red-600 mb-2">
                    You have not approved the marketplace contract.
                  </p>
                  <button
                    onClick={handleSetApprovalForAll}
                    disabled={isApproving}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
                  >
                    {isApproving ? "Approving..." : "Approve Marketplace"}
                  </button>
                </div>
              ) : null}
            </div>

            {/* List Button */}
            <div className="mt-6">
              {hasApproval && ownedNFTs && ownedNFTs.length > 0 && (
                <Web3Button
                  {...connectWalletProps}
                  contractAddress={marketplaceContractAddress as string}
                  action={async () => {
                    try {
                      await createDirectListing({
                        assetContractAddress: formData.address,
                        tokenId: formData.tokenId,
                        pricePerToken: formData.price,
                        currencyContractAddress: NATIVE_TOKEN_ADDRESS,
                        quantity: 1,
                        startTimestamp: new Date(),
                        endTimestamp: new Date(
                          new Date().getTime() + 7 * 24 * 60 * 60 * 1000
                        ),
                      });
                      setActiveTab(Tab.BUY);
                    } catch (error) {
                      console.error("Error creating listing:", error);
                      toast.error(
                        "Failed to create listing. Please try again."
                      );
                    }
                  }}
                >
                  {hasApproval ? "List" : "Approve and List"}
                </Web3Button>
              )}
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
                    <h3 className="text-lg font-bold mb-2 text-gray-200 mx-auto text-center">
                      {ownedNFTs[currentIndex].metadata.name ||
                        `Token ID: ${ownedNFTs[currentIndex].metadata.id}`}
                    </h3>
                    <ThirdwebNftMedia
                      metadata={ownedNFTs[currentIndex].metadata}
                      className="w-full mx-auto h-auto mb-2"
                    />
                    {ownedNFTs[currentIndex].metadata.description && (
                      <p className="text-gray-300">
                        {ownedNFTs[currentIndex].metadata.description}
                      </p>
                    )}
                    <p className="text-gray-300">
                      <strong>Token ID:</strong>{" "}
                      {ownedNFTs[currentIndex].metadata.id.toString()}
                    </p>
                    <p className="text-gray-300">
                      <strong>Owner:</strong>{" "}
                      {formatAddress(ownedNFTs[currentIndex].owner)}
                    </p>
                  </div>

                  {/* Pagination Controls */}
                  {ownedNFTs.length > 1 && (
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={currentIndex === ownedNFTs.length - 1}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md disabled:opacity-50"
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
