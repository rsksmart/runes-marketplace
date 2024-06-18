export type NFT = {
    id: number;
    asset: {
        name: string;
        id: string;
        description: string;
        image: string;
    };
    buyoutCurrencyValuePerToken: {
        displayValue: string;
        symbol: string;
    };
    sellerAddress: string;
};
