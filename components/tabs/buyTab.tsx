"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MediaRenderer,
  Status,
  useContract,
  useDirectListings,
} from "@thirdweb-dev/react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Image, CircleHelp } from "lucide-react";
import { useRouter } from "next/navigation";
import { marketplaceContractAddress } from "@/constants";

export default function BuyTab() {
  const { contract } = useContract(
    marketplaceContractAddress,
    "marketplace-v3",
  );
  const { data: listings, isLoading: loadingListings } =
    useDirectListings(contract);

  const router = useRouter();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Buy</CardTitle>
        <CardDescription>Buy a Rune!</CardDescription>
      </CardHeader>
      <CardContent>
        {loadingListings ? (
          <div className="animate-pulse grid w-full md:grid-cols-5 xl:grid-cols-8 sm:grid-cols-2 gap-6 mt-3">
            {[...Array(10)].map((_, i) => (
              <div key={i}>
                <div className="max-w-[200px] max-h-[200px]">
                  <div className="w-[200px] h-[200px] my-2 bg-border rounded-lg items-center justify-center flex">
                    <Image className="w-14 h-14 text-gray-200" />
                  </div>
                </div>
                <div className="">
                  <div className="h-[10px] my-2 bg-border rounded-lg max-w-[150px]" />
                  <div className="h-[10px] my-2 bg-border rounded-lg max-w-[80px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid w-full md:grid-cols-5 xl:grid-cols-8 sm:grid-cols-2 gap-6 mt-5">
            {listings
              ?.filter((listing) => listing.status === Status.Active)
              .map((listing) => (
                <div
                  key={listing.id}
                  className="hover:text-purple-400 hover:font-bold px-4 cursor-pointer"
                  onClick={() => router.push(`/listings/${listing.id}`)}
                >
                  <div className="w-max-[200px] max-h-[200px]">
                    <Link href={`/listings/${listing.id}`} className="w-[200px]">
                      {listing.asset.image ? (
                        <div className="w-[200px] h-[200px] rounded-lg my-2">
                          <MediaRenderer
                            className="rounded-lg"
                            width="200px"
                            height="200px"
                            src={listing.asset.image}
                          />
                        </div>
                      ) : (
                        <div className="w-[200px] h-[200px] my-2 bg-border rounded-lg items-center justify-center flex">
                          <Image className="w-14 h-14 text-gray-200" />
                        </div>
                      )}
                    </Link>
                  </div>
                  <div className="flex flex-col items-start">
                    <Link
                      href={`/listings/${listing.id}`}
                      className="font-bold tracking-wide"
                    >
                      {listing.asset.name}
                    </Link>
                    <div className="flex flex-row items-center">
                      <p>
                        {listing.currencyValuePerToken.displayValue}{" "}
                        {listing.currencyValuePerToken.symbol}
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
        )}
      </CardContent>
    </Card>
  );
}
