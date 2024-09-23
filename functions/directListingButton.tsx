"use client";
import { useRouter } from "next/navigation";
import { Address, NFT as NFTType } from "thirdweb";
import { TransactionButton } from "thirdweb/react";
import { createListing } from "thirdweb/extensions/marketplace";
import toast from "react-hot-toast";

import { MARKETPLACE } from "@/app/utils/contracts";
import { toastStyle } from "@/lib/utils";

export default function DirectListingButton({
	nft,
	pricePerToken,
}: {
	nft: NFTType;
	pricePerToken: string;
}) {
	const router = useRouter();
	return (
		<TransactionButton
			transaction={() => {
				return createListing({
					contract: MARKETPLACE,
					assetContractAddress: '0x86F424CE44D790513b9F6A4Cfc441007102871F1',
					tokenId: nft.id,
					pricePerToken,
				});
			}}
			onTransactionSent={() => {
				toast.loading("Listing...", {
					id: "direct",
					style: toastStyle,
					position: "bottom-center",
				});
			}}
			onError={(error) => {
				toast(`Listing Failed!`, {
					icon: "❌",
					id: "direct",
					style: toastStyle,
					position: "bottom-center",
				});
			}}
			onTransactionConfirmed={(txResult) => {
				toast("Listed Successfully!", {
					icon: "🥳",
					id: "direct",
					style: toastStyle,
					position: "bottom-center",
				});
				router.push(
					`/buy`
				);
			}}
		>
			List for Sale
		</TransactionButton>
	);
}